const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const DB_PATH = path.join(__dirname, "data", "db.json");
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/sws";

async function run() {
  if (!fs.existsSync(DB_PATH)) {
    console.log("No local database file found at data/db.json. Nothing to migrate.");
    return;
  }

  const rawData = fs.readFileSync(DB_PATH, "utf-8");
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to parse data/db.json:", err.message);
    return;
  }

  console.log("Connecting to CockroachDB...");
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
  });

  try {
    // Ensure tables exist
    console.log("Checking tables...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255) NOT NULL,
        classNum VARCHAR(50) NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        isApproved BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        classNum VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        userId VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        expiresAt TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `);

    // Migrate students
    if (Array.isArray(data.students) && data.students.length > 0) {
      console.log(`Migrating ${data.students.length} students...`);
      for (const s of data.students) {
        await pool.query(
          `INSERT INTO students (id, name, email, phone, classNum, passwordHash, isApproved, createdAt) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
           ON CONFLICT (id) DO UPDATE SET 
           name = EXCLUDED.name, email = EXCLUDED.email, phone = EXCLUDED.phone, 
           classNum = EXCLUDED.classNum, passwordHash = EXCLUDED.passwordHash, 
           isApproved = EXCLUDED.isApproved`,
          [s.id, s.name, s.email, s.phone, s.classNum, s.passwordHash, s.isApproved, s.createdAt]
        );
      }
    }

    // Migrate admins
    if (Array.isArray(data.admins) && data.admins.length > 0) {
      console.log(`Migrating ${data.admins.length} admins...`);
      for (const a of data.admins) {
        await pool.query(
          `INSERT INTO admins (id, email, passwordHash, name) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (id) DO UPDATE SET 
           email = EXCLUDED.email, passwordHash = EXCLUDED.passwordHash, name = EXCLUDED.name`,
          [a.id, a.email, a.passwordHash, a.name]
        );
      }
    }

    // Migrate notes
    if (Array.isArray(data.notes) && data.notes.length > 0) {
      console.log(`Migrating ${data.notes.length} notes...`);
      for (const n of data.notes) {
        await pool.query(
          `INSERT INTO notes (id, title, subject, classNum, content, createdAt, updatedAt) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) 
           ON CONFLICT (id) DO UPDATE SET 
           title = EXCLUDED.title, subject = EXCLUDED.subject, classNum = EXCLUDED.classNum, 
           content = EXCLUDED.content, updatedAt = EXCLUDED.updatedAt`,
          [n.id, n.title, n.subject, n.classNum, n.content, n.createdAt, n.updatedAt]
        );
      }
    }

    // Migrate sessions
    if (Array.isArray(data.sessions) && data.sessions.length > 0) {
      console.log(`Migrating ${data.sessions.length} sessions...`);
      for (const s of data.sessions) {
        await pool.query(
          `INSERT INTO sessions (token, userId, role, expiresAt) 
           VALUES ($1, $2, $3, $4) 
           ON CONFLICT (token) DO UPDATE SET 
           userId = EXCLUDED.userId, role = EXCLUDED.role, expiresAt = EXCLUDED.expiresAt`,
          [s.token, s.userId, s.role, s.expiresAt]
        );
      }
    }

    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await pool.end();
  }
}

run();

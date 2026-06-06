const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const DB_PATH = path.join(__dirname, "data", "db.json");
const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  if (!MONGODB_URI) {
    console.error("Please define MONGODB_URI in your environment or .env file");
    return;
  }

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

  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(); // uses database from connection string, typically 'sws'

    // Migrate students
    if (Array.isArray(data.students) && data.students.length > 0) {
      console.log(`Migrating ${data.students.length} students...`);
      for (const s of data.students) {
        await db.collection("students").updateOne(
          { _id: s.id },
          {
            $set: {
              name: s.name,
              email: s.email,
              phone: s.phone,
              classNum: s.classNum,
              passwordHash: s.passwordHash,
              isApproved: s.isApproved,
              createdAt: s.createdAt,
            },
          },
          { upsert: true }
        );
      }
    }

    // Migrate admins
    if (Array.isArray(data.admins) && data.admins.length > 0) {
      console.log(`Migrating ${data.admins.length} admins...`);
      for (const a of data.admins) {
        await db.collection("admins").updateOne(
          { _id: a.id },
          {
            $set: {
              email: a.email,
              passwordHash: a.passwordHash,
              name: a.name,
            },
          },
          { upsert: true }
        );
      }
    }

    // Migrate notes
    if (Array.isArray(data.notes) && data.notes.length > 0) {
      console.log(`Migrating ${data.notes.length} notes...`);
      for (const n of data.notes) {
        await db.collection("notes").updateOne(
          { _id: n.id },
          {
            $set: {
              title: n.title,
              subject: n.subject,
              classNum: n.classNum,
              content: n.content,
              createdAt: n.createdAt,
              updatedAt: n.updatedAt,
            },
          },
          { upsert: true }
        );
      }
    }

    // Migrate sessions
    if (Array.isArray(data.sessions) && data.sessions.length > 0) {
      console.log(`Migrating ${data.sessions.length} sessions...`);
      for (const s of data.sessions) {
        await db.collection("sessions").updateOne(
          { _id: s.token },
          {
            $set: {
              userId: s.userId,
              role: s.role,
              expiresAt: s.expiresAt,
            },
          },
          { upsert: true }
        );
      }
    }

    console.log("Migration to MongoDB complete!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.close();
  }
}

run();

const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const DB_PATH = path.join(__dirname, "data", "db.json");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sws";

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

  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB.");
    const db = client.db();

    // Migrate students
    if (Array.isArray(data.students) && data.students.length > 0) {
      console.log(`Migrating ${data.students.length} students...`);
      // Use id as filter to prevent duplicate inserts
      for (const student of data.students) {
        await db.collection("students").updateOne(
          { id: student.id },
          { $set: student },
          { upsert: true }
        );
      }
    }

    // Migrate admins
    if (Array.isArray(data.admins) && data.admins.length > 0) {
      console.log(`Migrating ${data.admins.length} admins...`);
      for (const admin of data.admins) {
        await db.collection("admins").updateOne(
          { id: admin.id },
          { $set: admin },
          { upsert: true }
        );
      }
    }

    // Migrate notes
    if (Array.isArray(data.notes) && data.notes.length > 0) {
      console.log(`Migrating ${data.notes.length} notes...`);
      for (const note of data.notes) {
        await db.collection("notes").updateOne(
          { id: note.id },
          { $set: note },
          { upsert: true }
        );
      }
    }

    // Migrate sessions
    if (Array.isArray(data.sessions) && data.sessions.length > 0) {
      console.log(`Migrating ${data.sessions.length} sessions...`);
      for (const session of data.sessions) {
        await db.collection("sessions").updateOne(
          { token: session.token },
          { $set: session },
          { upsert: true }
        );
      }
    }

    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.close();
  }
}

run();

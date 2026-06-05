import { NextRequest, NextResponse } from "next/server";
import {
  getSession,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/lib/db";

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) return null;
  const session = await getSession(token);
  if (!session || session.role !== "admin") return null;
  return session;
}

// GET — list all notes
export async function GET(req: NextRequest) {
  const session = await verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const notes = await getAllNotes();
  return NextResponse.json({ notes });
}

// POST — create a note
export async function POST(req: NextRequest) {
  const session = await verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, subject, classNum, content } = await req.json();
  if (!title || !subject || !classNum || !content) {
    return NextResponse.json(
      { error: "Title, subject, class, and content are required" },
      { status: 400 }
    );
  }

  const note = await createNote(title, subject, classNum, content);
  return NextResponse.json({ success: true, note });
}

// PATCH — update a note
export async function PATCH(req: NextRequest) {
  const session = await verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, subject, classNum, content } = await req.json();
  if (!id || !title || !subject || !classNum || !content) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const note = await updateNote(id, title, subject, classNum, content);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, note });
}

// DELETE — delete a note
export async function DELETE(req: NextRequest) {
  const session = await verifyAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const noteId = searchParams.get("id");
  if (!noteId) {
    return NextResponse.json({ error: "Note id required" }, { status: 400 });
  }

  const deleted = await deleteNote(noteId);
  if (!deleted) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

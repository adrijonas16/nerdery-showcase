const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());

// SQLite database
const db = new Database(path.join(__dirname, "comments.db"));

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id TEXT NOT NULL,
    name TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// GET comments for a project
app.get("/api/comments/:projectId", (req, res) => {
  const { projectId } = req.params;
  const comments = db
    .prepare(
      "SELECT id, project_id, name, comment, created_at FROM comments WHERE project_id = ? ORDER BY created_at DESC"
    )
    .all(projectId);
  res.json(comments);
});

// GET all comments
app.get("/api/comments", (_req, res) => {
  const comments = db
    .prepare(
      "SELECT id, project_id, name, comment, created_at FROM comments ORDER BY created_at DESC"
    )
    .all();
  res.json(comments);
});

// POST a new comment
app.post("/api/comments", (req, res) => {
  const { project_id, name, comment } = req.body;

  if (!project_id || !name?.trim() || !comment?.trim()) {
    return res.status(400).json({ error: "project_id, name, and comment are required" });
  }

  // Basic sanitization
  const cleanName = name.trim().slice(0, 100);
  const cleanComment = comment.trim().slice(0, 1000);

  const result = db
    .prepare(
      "INSERT INTO comments (project_id, name, comment) VALUES (?, ?, ?)"
    )
    .run(project_id, cleanName, cleanComment);

  const newComment = db
    .prepare("SELECT id, project_id, name, comment, created_at FROM comments WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Comments API running on http://localhost:${PORT}`);
});

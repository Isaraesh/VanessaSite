// Simple Express backend for guestbook entries
// Deploy this folder to Render.com as a Node.js Web Service
// Start command: npx tsx server.ts  (or compile with tsc first)
// Build command: npm install

import express, { Request, Response } from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "entries.json");

interface Entry {
  id: number;
  name: string;
  message: string;
  color: string;
  sticker: string;
  date: string;
}

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL ?? "*" }));
app.use(express.json());

function loadEntries(): Entry[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf8")) as Entry[];
  } catch {
    return [];
  }
}

function saveEntries(entries: Entry[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

app.get("/api/guestbook", (_req: Request, res: Response) => {
  res.json(loadEntries());
});

app.post("/api/guestbook", (req: Request, res: Response) => {
  const { name, message, color, sticker } = req.body as Partial<Entry>;
  if (!name?.trim() || !message?.trim()) {
    res.status(400).json({ error: "name and message are required" });
    return;
  }
  const entry: Entry = {
    id: Date.now(),
    name: name.trim().slice(0, 40),
    message: message.trim().slice(0, 200),
    color: color ?? "pink",
    sticker: sticker ?? "🌸",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
  const entries = [entry, ...loadEntries()];
  saveEntries(entries);
  res.status(201).json(entry);
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => console.log(`guestbook server running on port ${PORT}`));

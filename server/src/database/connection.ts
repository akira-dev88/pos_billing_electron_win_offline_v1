import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory path for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default database path - relative to server directory
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database/pos_billing.db');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}

console.log(`🗄️  Database path: ${path.resolve(dbPath)}`);

// Initialize database
const options: Database.Options = {};

if (process.env.NODE_ENV === 'development') {
  options.verbose = console.log;
}

const db = new Database(path.resolve(dbPath), options);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;
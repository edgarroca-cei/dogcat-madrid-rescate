import sqlite3 from 'sqlite3';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error open database: ', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      slug TEXT,
      excerpt TEXT,
      content TEXT,
      image TEXT,
      color TEXT,
      date TEXT,
      author TEXT,
      createdAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS settings (
      id TEXT PRIMARY KEY,
      paypalLink TEXT,
      bizumNumber TEXT,
      bizumConcept TEXT,
      updatedAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS mapas (
      id TEXT PRIMARY KEY,
      title TEXT,
      mid TEXT,
      description TEXT,
      icon TEXT,
      "order" INTEGER,
      createdAt TEXT
    )`);
  }
});

// Promisified wrappers
export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export default db;

// src/backend/db.ts
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root', // replace with your MySQL username
  password: 'Vocu1727', // replace with your MySQL password
  database: 'discussion_forum',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

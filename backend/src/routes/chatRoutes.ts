import express from 'express';
import { pool } from '../db/db'; // Assuming db.ts exports your MySQL pool
import { promises } from 'dns';

const router = express.Router();

// GET all chat messages
// GET all chat messages
router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM chat_messages ORDER BY created_at ASC');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ message: 'Failed to fetch chat messages' });
    }
  });
  
  // POST a new chat message
  router.post('/', async (req, res):Promise<any> => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }
  
    try {
      const [result] = await pool.query('INSERT INTO chat_messages (message) VALUES (?)', [message]);
      res.status(201).json({ id: (result as any).insertId, message });
    } catch (error) {
      console.error('Error posting chat message:', error);
      res.status(500).json({ message: 'Failed to post chat message' });
    }
  });
  
export default router;
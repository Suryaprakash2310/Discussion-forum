// src/routes/questionRoutes.ts

import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query('SELECT * FROM questions ORDER BY id DESC');
      const questions = (rows as any[]).map(q => ({
        ...q,
        tags: typeof q.tags === 'string' ? q.tags.split(',').map((t: string) => t.trim()) : q.tags
      }));
      
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Failed to fetch questions' });
    }
  });

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    
    console.log('Received:', req.body);

    const [result] = await pool.execute(
      'INSERT INTO questions (title, description, tags) VALUES (?, ?, ?)',
      [title, description, tags]
    );

    res.status(201).json({ message: 'Question posted successfully', id: (result as any).insertId });
  } catch (error) {
    console.error('Error posting question:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

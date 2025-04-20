// src/routes/questionRoutes.ts

import { Router, Request, Response } from 'express';
import { pool } from '../db/db';
import { promises } from 'dns';

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

// i fetch single question to show it iin the question-detail.component.ts
router.get('/:id', async (req: Request, res: Response) : Promise<any> => {
  try {
    const [rows] = await pool.query('SELECT * FROM questions WHERE id = ? LIMIT 1', [req.params.id]) as [any[], any];

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const question = rows[0]; // Safely access the first element of rows
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Failed to fetch question' });
  }
});


router.delete('/:id', async (req: Request, res: Response) : Promise<any> => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute('DELETE FROM questions WHERE id = ?', [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Failed to delete question' });
  }
});



export default router;

import { Router } from 'express';
import type { Request, Response } from 'express';
import { pool } from '../db/db';
import { ResultSetHeader } from 'mysql2';

const router = Router();

router.post('/', async  (req: Request, res: Response): Promise<any> =>{
        const { question_id, answer_text } = req.body;

        if (!question_id || !answer_text) {
            return res.status(400).json({ error: 'Missing data' });
        }

        try {
            const [result]: any = await pool.execute(
                'INSERT INTO answers (question_id, answer_text) VALUES (?, ?)',
                [question_id, answer_text]
            );
            res.status(201).json({ message: 'Answer submitted', answerId: result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    });

    router.get('/:questionId', async (req: Request, res: Response) => {
        const { questionId } = req.params;
      
        try {
          const [rows] = await pool.execute(
            'SELECT * FROM answers WHERE question_id = ? ORDER BY created_at DESC',
            [questionId]
          );
          res.status(200).json(rows);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to fetch answers' });
        }
      });

      // PUT /api/answers/:id/like
router.put('/:id/like', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [] = await pool.execute(
      'UPDATE answers SET likes = likes + 1 WHERE id = ?',
      [id]
    );
    res.status(200).json({ message: 'Like updated' });
  } catch (err) {
    console.error('Error updating like:', err);
    res.status(500).json({ error: 'Failed to update like' });
  }
});

      

export default router;

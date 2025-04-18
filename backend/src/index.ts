// src/index.ts

import express from 'express';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes';
import answerRoutes from './routes/answer';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running ✅');
});

app.use('/questions', questionRoutes); 
app.use('/answers', answerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

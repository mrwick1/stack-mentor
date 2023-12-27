import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import v1Routes from '../src/routes/v1Routes';
import { errorMiddleware } from './middleware/errorMiddleWare';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// global error handler
app.use(errorMiddleware)

// Routes
app.use('/api/v1', v1Routes);

// Default Route
app.get('*', (req, res) => {
  res.send('Welcome to the MERN Stack App');
});

export default app;

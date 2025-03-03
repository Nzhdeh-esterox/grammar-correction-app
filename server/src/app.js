import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.router.js';
import grammarRoutes from './routes/grammar.router.js';
import connectDB from './config/db.js'; // Import the DB connection

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/check-grammar', grammarRoutes);

export default app;

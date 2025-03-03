import express from 'express';
import { checkAndCorrectGrammar } from '../controllers/grammar-corrector.controller.js';

const router = express.Router();

// Route for checking grammar
router.post('/', checkAndCorrectGrammar);

export default router;

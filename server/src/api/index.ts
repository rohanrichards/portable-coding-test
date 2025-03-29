import express, { Router } from 'express';
import search from './search';

const router: Router = express.Router();

router.use('/search', search);

export default router; 
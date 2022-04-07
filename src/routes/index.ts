import express from 'express';
import { getHello } from '../controllers';

const router = express.Router();

router.get('/', getHello);

export { router as Router };

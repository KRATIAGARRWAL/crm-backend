import express from 'express';
import { createSegment, getSegments, previewAudience } from '../controllers/segmentController.js';
const router = express.Router();

router.post('/', createSegment);
router.get('/', getSegments);
router.post('/preview', previewAudience);

export default router;

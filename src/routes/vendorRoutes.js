import express from 'express';
import { simulateDelivery } from '../controllers/dummyVendorController.js';
import { receiveReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.post('/send', simulateDelivery);
router.post('/receipt', receiveReceipt);

export default router;

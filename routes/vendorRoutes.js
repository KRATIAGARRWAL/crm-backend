import express from 'express';
import { simulateDelivery } from '../controllers/dummyVendorController.js';
import { receiveReceipt } from '../controllers/receiptController.js';

const router = express.Router();

console.log("in vendor route");

router.post('/send', simulateDelivery);
router.post('/receipt', receiveReceipt);

export default router;

import CommunicationLog from '../models/CommunicationLog.js';

export const receiveReceipt = async (req, res) => {
  try {
    const { segmentId, customerId, message, status } = req.body;

    const log = new CommunicationLog({
      segmentId,
      customerId,
      message,
      status,
    });

    await log.save();
    res.status(201).json(log);
  } catch (error) {
    console.error('Receipt Error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  segmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segment',
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  message: String,
  status: {
    type: String,
    enum: ['SENT', 'FAILED'],
    default: 'SENT',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('CommunicationLog', logSchema);

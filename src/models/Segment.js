import mongoose from 'mongoose';

const segmentSchema = new mongoose.Schema({
  name: String,
  rules: [
    {
      field: String,       // e.g., "totalSpend"
      operator: String,    // e.g., ">"
      value: mongoose.Schema.Types.Mixed // e.g., 10000
    }
  ],
  logic: String,           // e.g., "AND", "OR"
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Segment', segmentSchema);


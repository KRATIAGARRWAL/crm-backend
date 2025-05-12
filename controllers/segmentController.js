import Segment from '../models/Segment.js';
import Customer from '../models/Customer.js';
import fetch from 'node-fetch';
import CommunicationLog from '../models/CommunicationLog.js';

export const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort({ createdAt: -1 });

    // For each segment, fetch stats from communicationlogs
    const segmentsWithStats = await Promise.all(
      segments.map(async (seg) => {
        const logs = await CommunicationLog.find({ segmentId: seg._id });

        const sent = logs.filter(l => l.status === 'SENT').length;
        const failed = logs.filter(l => l.status === 'FAILED').length;

        return {
          ...seg.toObject(),
          sent,
          failed,
          audienceSize: logs.length
        };
      })
    );

    res.json(segmentsWithStats);
  } catch (err) {
    console.error('Failed to fetch segments:', err.message);
    res.status(500).json({ message: 'Error retrieving campaigns' });
  }
};




export const previewAudience = async (req, res) => {
  try {
    const { rules, logic } = req.body;

    // Build MongoDB query based on rules
    const query = rules.map(rule => {
      const { field, operator, value } = rule;
      const mongoOp =
        operator === '>' ? '$gt' :
        operator === '<' ? '$lt' :
        operator === '=' ? '$eq' : null;

      if (!mongoOp) return {};

      // Special case: lastActive → convert days to date
      if (field === 'lastActive') {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - Number(value));
        return { lastActive: { [mongoOp]: dateThreshold } };
      }

      return { [field]: { [mongoOp]: Number(value) } };
    });

    const mongoQuery = logic === 'AND' ? { $and: query } : { $or: query };
    const audience = await Customer.find(mongoQuery);

    res.json({ count: audience.length });
  } catch (err) {
    console.error('Preview Audience Error:', err.message);
    res.status(500).json({ message: 'Failed to preview audience' });
  }
};




export const createSegment = async (req, res) => {
  try {
    // const { name, rules, logic } = req.body;
    const { name, rules, logic,message } = req.body;

    // console.log(message+" fghf");

    const segment = new Segment({ name, rules, logic });
    await segment.save();

    // === Find matching customers ===
    const query = rules.map(rule => {
      const { field, operator, value } = rule;
      const mongoOp =
        operator === '>' ? '$gt' :
        operator === '<' ? '$lt' :
        operator === '=' ? '$eq' : null;

      if (!mongoOp) return {};

      if (field === 'lastActive') {
        const date = new Date();
        date.setDate(date.getDate() - Number(value));
        return { lastActive: { [mongoOp]: date } };
      }

      return { [field]: { [mongoOp]: Number(value) } };
    });

    const mongoQuery = logic === 'AND' ? { $and: query } : { $or: query };
    const customers = await Customer.find(mongoQuery);
    console.log("customers"+customers);

    // === Simulate delivery ===
    await fetch('http://localhost:5000/api/vendor/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        segmentId: segment._id,
        customers,
        message: message||"here’s 10% off on your next order!"
      }),
    });
    console.log("after fetch");

    res.status(201).json(segment);
  } catch (error) {
    console.error('Segment save error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

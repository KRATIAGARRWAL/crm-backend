import Order from '../models/Order.js';

export const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save(); // Saves to MongoDB

    // Save to Redis (optional step)
    const redisKey = `order:${savedOrder._id}`;
    if (req.redis) {
      await req.redis.set(redisKey, JSON.stringify(savedOrder), { EX: 3600 }); // 1 hour
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customerId');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

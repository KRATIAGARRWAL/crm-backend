import Order from '../models/Order.js';

export const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().populate('customerId');
  res.json(orders);
};

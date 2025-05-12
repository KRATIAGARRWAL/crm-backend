import Order from '../models/Order.js';
import Customer from '../models/Customer.js';

export const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save(); // Save order to MongoDB

    // Optional: Save order to Redis
    const redisOrderKey = `order:${savedOrder._id}`;
    if (req.redis) {
      await req.redis.set(redisOrderKey, JSON.stringify(savedOrder), { EX: 3600 }); // 1 hour
    }

    // 👉 Update the customer's total spend
    const customer = await Customer.findById(savedOrder.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Assuming the order has an 'amount' field
    customer.totalSpend = (customer.totalSpend || 0) + savedOrder.amount;
    const updatedCustomer = await customer.save();

    // Optional: Update customer in Redis
    const redisCustomerKey = `customer:${customer._id}`;
    if (req.redis) {
      await req.redis.set(redisCustomerKey, JSON.stringify(updatedCustomer), { EX: 3600 });
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

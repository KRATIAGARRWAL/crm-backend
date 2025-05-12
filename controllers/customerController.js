import Customer from '../models/Customer.js';

// Add a new customer
export const addCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    // Store in Redis (optional expiration of 1 hour)
    const redisKey = `customer:${savedCustomer._id}`;
    if (req.redis) {
      await req.redis.set(redisKey, JSON.stringify(savedCustomer), { EX: 3600 });
    }

    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Failed to add customer' });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

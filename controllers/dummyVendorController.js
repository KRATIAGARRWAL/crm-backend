import fetch from 'node-fetch';

export const simulateDelivery = async (req, res) => {
  const { segmentId, customers, message } = req.body;
  console.log("in simulate delivery")
  console.log(customers.length);

  // Send to each customer
  const logs = await Promise.all(customers.map(async (cust) => {
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

    // Call internal delivery receipt API
    await fetch('https://crm-backend-d0ny.onrender.com/api/vendor/receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        segmentId,
        customerId: cust._id,
        message: `Hi ${cust.name}, ${message}`,
        status,
      }),
    });

    return { customer: cust.name, status };
  }));

  res.status(200).json({ delivered: logs });
};

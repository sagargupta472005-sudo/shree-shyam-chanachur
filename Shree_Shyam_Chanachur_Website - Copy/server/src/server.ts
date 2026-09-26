import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Order endpoint – receives order data from frontend
app.post('/api/order', (req, res) => {
  const { name, weight, price } = req.body;
  if (!name || !weight || !price) {
    return res.status(400).json({ success: false, message: 'Missing order fields' });
  }
  console.log('Received order:', { name, weight, price });
  // In a real app you would persist the order, trigger notifications, etc.
  res.json({ success: true, data: { name, weight, price } });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

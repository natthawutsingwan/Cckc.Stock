const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// ใช้ Middleware
app.use(bodyParser.json());
app.use(cors()); // เพิ่มการรองรับ CORS

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017/stock', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// สร้าง Schema และ Model สำหรับสินค้า
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

const Product = mongoose.model('Product', productSchema);

// API สำหรับดึงข้อมูลสินค้าทั้งหมด
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// API สำหรับเพิ่มสินค้า
app.post('/api/products', async (req, res) => {
  const { name, quantity } = req.body;
  const product = new Product({ name, quantity });
  await product.save();
  res.status(201).json(product);
});

// API สำหรับแก้ไขสินค้า
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await Product.findByIdAndUpdate(id, { name, quantity }, { new: true });
  res.json(product);
});

// API สำหรับลบสินค้า
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(204).end();
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at https://github.com/natthawutsingwan/Cckc.Stock/blob/main/data`);
});

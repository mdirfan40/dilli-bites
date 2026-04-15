require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const { requireAdmin, requireDelivery } = require('./middleware/auth');
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dilli-bites-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
  },
}));

// ── HTML panel routes ─────────────────────────────────────────────────────────

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.get('/delivery', (req, res) => {
  res.sendFile(path.join(__dirname, 'delivery', 'index.html'));
});

// ── Public API ────────────────────────────────────────────────────────────────

app.get('/api/menu', async (req, res) => {
  try {
    const items = await db.getActiveMenuItems();
    res.json(items);
  } catch (err) {
    console.error('[API] GET /api/menu:', err);
    res.status(500).json({ error: 'Failed to load menu' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;

  const errors = [];
  if (!customer_name || !customer_name.trim()) errors.push('customer_name is required');
  if (!customer_phone || !/^\d{10}$/.test(String(customer_phone).trim())) errors.push('customer_phone must be 10 digits');
  if (!customer_address || !customer_address.trim()) errors.push('customer_address is required');
  if (!Array.isArray(items) || items.length === 0) errors.push('items must be a non-empty array');
  if (typeof total_amount !== 'number' || total_amount <= 0) errors.push('total_amount must be a positive number');
  if (errors.length > 0) return res.status(400).json({ error: errors[0] });

  const serverTotal = items.reduce((sum, item) => sum + (item.base_price * item.qty), 0);
  if (Math.abs(serverTotal - total_amount) > 1) {
    return res.status(400).json({ error: 'Order total does not match item prices' });
  }

  try {
    const orderId = await db.createOrder({
      customer_name: customer_name.trim(),
      customer_phone: String(customer_phone).trim(),
      customer_address: customer_address.trim(),
      items,
      total_amount,
    });
    res.status(201).json({ success: true, order_id: orderId });
  } catch (err) {
    console.error('[API] POST /api/orders:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// ── Admin auth ────────────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === adminPassword) {
    req.session.adminAuthenticated = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid password' });
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// ── Admin API (protected) ─────────────────────────────────────────────────────

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
  try {
    res.json(await db.getAllOrders());
  } catch (err) {
    console.error('[API] GET /api/admin/orders:', err);
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, delivery_person_id } = req.body;
  if (!status) return res.status(400).json({ error: 'status is required' });

  try {
    const result = await db.updateOrderStatus(id, status, delivery_person_id || null);
    if (result.error) return res.status(409).json({ error: result.error });
    res.json({ success: true, order: await db.getOrderById(id) });
  } catch (err) {
    console.error('[API] PATCH /api/admin/orders/:id:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.get('/api/admin/delivery-persons', requireAdmin, async (req, res) => {
  try {
    res.json(await db.getActiveDeliveryPersons());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load delivery persons' });
  }
});

app.post('/api/admin/delivery-persons', requireAdmin, async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) return res.status(400).json({ error: 'name, phone, and password are required' });
  if (!/^\d{10}$/.test(String(phone).trim())) return res.status(400).json({ error: 'phone must be 10 digits' });

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const id = await db.createDeliveryPerson({ name: name.trim(), phone: String(phone).trim(), password_hash });
    res.status(201).json({ success: true, id });
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'A delivery person with this phone already exists' });
    console.error('[API] POST /api/admin/delivery-persons:', err);
    res.status(500).json({ error: 'Failed to create delivery person' });
  }
});

app.get('/api/admin/menu', requireAdmin, async (req, res) => {
  try {
    res.json(await db.getAllMenuItems());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load menu items' });
  }
});

app.post('/api/admin/menu', requireAdmin, async (req, res) => {
  const { category, name, price_text, base_price } = req.body;
  if (!category || !name || !price_text || base_price === undefined) {
    return res.status(400).json({ error: 'category, name, price_text, and base_price are required' });
  }
  try {
    const id = await db.createMenuItem(req.body);
    res.status(201).json({ success: true, id });
  } catch (err) {
    console.error('[API] POST /api/admin/menu:', err);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

app.patch('/api/admin/menu/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updated = await db.updateMenuItem(id, req.body);
    if (!updated) return res.status(400).json({ error: 'No valid fields to update' });
    res.json({ success: true, item: await db.getMenuItemById(id) });
  } catch (err) {
    console.error('[API] PATCH /api/admin/menu/:id:', err);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

// ── Delivery auth ─────────────────────────────────────────────────────────────

app.post('/api/delivery/login', async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) return res.status(400).json({ error: 'phone and password are required' });

  try {
    const person = await db.getDeliveryPersonByPhone(String(phone).trim());
    if (!person) return res.status(401).json({ error: 'Invalid phone or password' });

    const match = await bcrypt.compare(password, person.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid phone or password' });

    req.session.deliveryPersonId = person.id;
    res.json({ success: true, name: person.name });
  } catch (err) {
    console.error('[API] POST /api/delivery/login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/delivery/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// ── Delivery API (protected) ──────────────────────────────────────────────────

app.get('/api/delivery/orders', requireDelivery, async (req, res) => {
  try {
    res.json(await db.getOrdersForDelivery(req.session.deliveryPersonId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

app.patch('/api/delivery/orders/:id', requireDelivery, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  const allowed = ['out_for_delivery', 'delivered'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Delivery persons can only set status to: ${allowed.join(', ')}` });
  }

  try {
    const order = await db.getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.deliveryPersonId !== req.session.deliveryPersonId) {
      return res.status(403).json({ error: 'This order is not assigned to you' });
    }
    const result = await db.updateOrderStatus(id, status);
    if (result.error) return res.status(409).json({ error: result.error });
    res.json({ success: true, order: await db.getOrderById(id) });
  } catch (err) {
    console.error('[API] PATCH /api/delivery/orders/:id:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ── Existing routes ───────────────────────────────────────────────────────────

app.get('/v2', (req, res) => {
  res.sendFile(path.join(__dirname, 'v2.html'));
});

app.get('/v2/', (req, res) => {
  res.redirect(301, '/v2');
});

// Static files (must be last)
app.use(express.static(path.join(__dirname)));

// ── Start ─────────────────────────────────────────────────────────────────────

db.seedIfEmpty().then(() => {
  app.listen(PORT, () => {
    console.log(`Dilli Bites server running on http://localhost:${PORT}`);
    console.log(`  Restaurant panel: http://localhost:${PORT}/admin`);
    console.log(`  Delivery portal:  http://localhost:${PORT}/delivery`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// ── Seed menu items on first run ──────────────────────────────────────────────

const SEED_ITEMS = [
  // Momos
  { category: 'momos', name: 'Steam Veg Momos',      description: 'Steam Momos',   priceText: 'Rs 30–50',  basePrice: 30,  imageUrl: 'images/steam_momos.webp',    badge: 'Steam',   sortOrder: 0  },
  { category: 'momos', name: 'Steam Paneer Momos',   description: 'Steam Momos',   priceText: 'Rs 45–80',  basePrice: 45,  imageUrl: 'images/steam_momos.webp',    badge: 'Steam',   sortOrder: 1  },
  { category: 'momos', name: 'Steam Chicken Momos',  description: 'Steam Momos',   priceText: 'Rs 45–80',  basePrice: 45,  imageUrl: 'images/steam_momos.webp',    badge: 'Steam',   sortOrder: 2  },
  { category: 'momos', name: 'Fried Veg Momos',      description: 'Fried Momos',   priceText: 'Rs 35–60',  basePrice: 35,  imageUrl: 'images/fried_momos.webp',    badge: 'Fried',   sortOrder: 3  },
  { category: 'momos', name: 'Fried Paneer Momos',   description: 'Fried Momos',   priceText: 'Rs 50–90',  basePrice: 50,  imageUrl: 'images/fried_momos.webp',    badge: 'Fried',   sortOrder: 4  },
  { category: 'momos', name: 'Fried Chicken Momos',  description: 'Fried Momos',   priceText: 'Rs 50–90',  basePrice: 50,  imageUrl: 'images/fried_momos.webp',    badge: 'Fried',   sortOrder: 5  },
  { category: 'momos', name: 'Gravy Veg Momos',      description: 'Gravy Momos',   priceText: 'Rs 60–100', basePrice: 60,  imageUrl: 'images/gravy_momos.webp',    badge: 'Gravy',   sortOrder: 6  },
  { category: 'momos', name: 'Gravy Paneer Momos',   description: 'Gravy Momos',   priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/gravy_momos.webp',    badge: 'Gravy',   sortOrder: 7  },
  { category: 'momos', name: 'Gravy Chicken Momos',  description: 'Gravy Momos',   priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/gravy_momos.webp',    badge: 'Gravy',   sortOrder: 8  },
  { category: 'momos', name: 'Malai Veg Momos',      description: 'Malai Momos',   priceText: 'Rs 60–100', basePrice: 60,  imageUrl: 'images/malai_momos.webp',    badge: 'Malai',   sortOrder: 9  },
  { category: 'momos', name: 'Malai Paneer Momos',   description: 'Malai Momos',   priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/malai_momos.webp',    badge: 'Malai',   sortOrder: 10 },
  { category: 'momos', name: 'Malai Chicken Momos',  description: 'Malai Momos',   priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/malai_momos.webp',    badge: 'Malai',   sortOrder: 11 },
  { category: 'momos', name: 'Kurkure Veg Momos',    description: 'Kurkure Momos', priceText: 'Rs 60–100', basePrice: 60,  imageUrl: 'images/kurkure_momos.webp',  badge: 'Kurkure', sortOrder: 12 },
  { category: 'momos', name: 'Kurkure Paneer Momos', description: 'Kurkure Momos', priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/kurkure_momos.webp',  badge: 'Kurkure', sortOrder: 13 },
  { category: 'momos', name: 'Kurkure Chicken Momos',description: 'Kurkure Momos', priceText: 'Rs 70–120', basePrice: 70,  imageUrl: 'images/kurkure_momos.webp',  badge: 'Kurkure', sortOrder: 14 },
  // Snacks
  { category: 'snacks', name: 'Salted Fries',    description: 'French Fries', priceText: 'Rs 30', basePrice: 30, imageUrl: 'images/french_fries.webp', badge: 'Fries',  sortOrder: 0 },
  { category: 'snacks', name: 'Peri-Peri Fries', description: 'French Fries', priceText: 'Rs 40', basePrice: 40, imageUrl: 'images/french_fries.webp', badge: 'Fries',  sortOrder: 1 },
  { category: 'snacks', name: 'Plain Burger',    description: 'Burger',       priceText: 'Rs 50', basePrice: 50, imageUrl: 'images/burger.webp',       badge: 'Burger', sortOrder: 2 },
  { category: 'snacks', name: 'Cheese Burger',   description: 'Burger',       priceText: 'Rs 60', basePrice: 60, imageUrl: 'images/burger.webp',       badge: 'Burger', sortOrder: 3 },
  { category: 'snacks', name: 'Chicken Burger',  description: 'Burger',       priceText: 'Rs 80', basePrice: 80, imageUrl: 'images/burger.webp',       badge: 'Burger', sortOrder: 4 },
  { category: 'snacks', name: 'Cold Coffee',     description: 'Drinks',       priceText: 'Rs 80', basePrice: 80, imageUrl: null,                       badge: 'Drink',  sortOrder: 5 },
  // Pizza
  { category: 'pizza', name: 'Margherita',     description: 'Signature Pizza', priceText: 'Rs 120–349', basePrice: 120, imageUrl: null, badge: 'Pizza', sortOrder: 0 },
  { category: 'pizza', name: 'Capsicum India', description: 'Signature Pizza', priceText: 'Rs 149–399', basePrice: 149, imageUrl: null, badge: 'Pizza', sortOrder: 1 },
  { category: 'pizza', name: 'Paneer Spicy',   description: 'Signature Pizza', priceText: 'Rs 149–399', basePrice: 149, imageUrl: null, badge: 'Pizza', sortOrder: 2 },
  { category: 'pizza', name: 'Veggie Paradise',description: 'Signature Pizza', priceText: 'Rs 149–399', basePrice: 149, imageUrl: null, badge: 'Pizza', sortOrder: 3 },
  { category: 'pizza', name: 'Extravaganza',   description: 'Signature Pizza', priceText: 'Rs 159–420', basePrice: 159, imageUrl: null, badge: 'Pizza', sortOrder: 4 },
  { category: 'pizza', name: 'Country Special',description: 'Signature Pizza', priceText: 'Rs 169–449', basePrice: 169, imageUrl: null, badge: 'Pizza', sortOrder: 5 },
  // Extras
  { category: 'extras', name: 'Stuff Garlic Bread', description: 'Sides',   priceText: 'Rs 149', basePrice: 149, imageUrl: 'images/stuff_gralic_bread.webp', badge: 'Sides', sortOrder: 0 },
  { category: 'extras', name: 'Choco Lava',         description: 'Dessert', priceText: 'Rs 99',  basePrice: 99,  imageUrl: 'images/choco_lava.webp',         badge: 'Sweet', sortOrder: 1 },
];

async function seedIfEmpty() {
  const count = await prisma.menuItem.count();
  if (count === 0) {
    await prisma.menuItem.createMany({ data: SEED_ITEMS });
    console.log('[DB] Seeded', SEED_ITEMS.length, 'menu items');
  }
}

// ── Valid status transitions ──────────────────────────────────────────────────

const VALID_TRANSITIONS = {
  new:              ['accepted', 'rejected'],
  accepted:         ['assigned'],
  assigned:         ['out_for_delivery'],
  out_for_delivery: ['delivered'],
};

function isValidTransition(from, to) {
  return (VALID_TRANSITIONS[from] || []).includes(to);
}

// ── Menu helpers ──────────────────────────────────────────────────────────────

async function getActiveMenuItems() {
  return prisma.menuItem.findMany({
    where: { isActive: true },
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
  });
}

async function getAllMenuItems() {
  return prisma.menuItem.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
  });
}

async function getMenuItemById(id) {
  return prisma.menuItem.findUnique({ where: { id } });
}

async function createMenuItem(data) {
  const item = await prisma.menuItem.create({
    data: {
      category:    data.category,
      name:        data.name,
      description: data.description || null,
      priceText:   data.priceText || data.price_text,
      basePrice:   data.basePrice  || data.base_price,
      imageUrl:    data.imageUrl   || data.image_url  || null,
      badge:       data.badge      || null,
      stock:       data.stock      !== undefined ? data.stock : -1,
      isActive:    data.isActive   !== undefined ? Boolean(data.isActive) : true,
      sortOrder:   data.sortOrder  || data.sort_order || 0,
    },
  });
  return item.id;
}

async function updateMenuItem(id, fields) {
  const data = {};
  if (fields.category    !== undefined) data.category    = fields.category;
  if (fields.name        !== undefined) data.name        = fields.name;
  if (fields.description !== undefined) data.description = fields.description;
  if (fields.priceText   !== undefined) data.priceText   = fields.priceText;
  if (fields.price_text  !== undefined) data.priceText   = fields.price_text;
  if (fields.basePrice   !== undefined) data.basePrice   = fields.basePrice;
  if (fields.base_price  !== undefined) data.basePrice   = fields.base_price;
  if (fields.imageUrl    !== undefined) data.imageUrl    = fields.imageUrl;
  if (fields.image_url   !== undefined) data.imageUrl    = fields.image_url;
  if (fields.badge       !== undefined) data.badge       = fields.badge;
  if (fields.stock       !== undefined) {
    data.stock = fields.stock;
    if (fields.stock > 0) data.isActive = true;
  }
  if (fields.isActive    !== undefined) data.isActive    = Boolean(fields.isActive);
  if (fields.is_active   !== undefined) data.isActive    = Boolean(fields.is_active);
  if (fields.sortOrder   !== undefined) data.sortOrder   = fields.sortOrder;
  if (fields.sort_order  !== undefined) data.sortOrder   = fields.sort_order;
  if (Object.keys(data).length === 0) return false;
  await prisma.menuItem.update({ where: { id }, data });
  return true;
}

// ── Order helpers ─────────────────────────────────────────────────────────────

async function createOrder(data) {
  const order = await prisma.order.create({
    data: {
      customerName:    data.customer_name,
      customerPhone:   data.customer_phone,
      customerAddress: data.customer_address,
      totalAmount:     data.total_amount,
      orderItems: {
        create: data.items.map(item => ({
          menuItemId: item.menu_item_id,
          name:       item.name,
          qty:        item.qty,
          basePrice:  item.base_price,
        })),
      },
    },
  });
  return order.id;
}

function _formatOrder(order) {
  return {
    ...order,
    items: (order.orderItems || []).map(oi => ({
      menu_item_id: oi.menuItemId,
      name:         oi.name,
      qty:          oi.qty,
      base_price:   oi.basePrice,
    })),
    delivery_person_name: order.deliveryPerson ? order.deliveryPerson.name : null,
  };
}

async function getAllOrders() {
  const orders = await prisma.order.findMany({
    include: { orderItems: true, deliveryPerson: { select: { name: true } } },
    orderBy: { id: 'desc' },
  });
  return orders.map(_formatOrder);
}

async function getOrderById(id) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true, deliveryPerson: { select: { name: true } } },
  });
  if (!order) return null;
  return _formatOrder(order);
}

async function updateOrderStatus(id, status, deliveryPersonId) {
  const order = await prisma.order.findUnique({ where: { id }, include: { orderItems: true } });
  if (!order) return { error: 'Order not found' };
  if (!isValidTransition(order.status, status)) {
    return { error: `Cannot transition from '${order.status}' to '${status}'` };
  }

  if (status === 'accepted') {
    // Decrement stock for each item in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.order.update({ where: { id }, data: { status: 'accepted' } });
      for (const oi of order.orderItems) {
        const menuItem = await tx.menuItem.findUnique({ where: { id: oi.menuItemId } });
        if (menuItem && menuItem.stock > 0) {
          const newStock = Math.max(0, menuItem.stock - oi.qty);
          await tx.menuItem.update({
            where: { id: oi.menuItemId },
            data: { stock: newStock, ...(newStock === 0 ? { isActive: false } : {}) },
          });
        }
      }
    });
  } else if (status === 'assigned') {
    if (!deliveryPersonId) return { error: 'delivery_person_id is required when assigning' };
    await prisma.order.update({
      where: { id },
      data: { status: 'assigned', deliveryPersonId },
    });
  } else {
    await prisma.order.update({ where: { id }, data: { status } });
  }

  return { success: true };
}

// ── Delivery person helpers ───────────────────────────────────────────────────

async function getDeliveryPersonByPhone(phone) {
  return prisma.deliveryPerson.findFirst({ where: { phone, isActive: true } });
}

async function getDeliveryPersonById(id) {
  return prisma.deliveryPerson.findUnique({ where: { id } });
}

async function getActiveDeliveryPersons() {
  return prisma.deliveryPerson.findMany({
    where: { isActive: true },
    select: { id: true, name: true, phone: true },
  });
}

async function getOrdersForDelivery(deliveryPersonId) {
  const orders = await prisma.order.findMany({
    where: {
      deliveryPersonId,
      status: { in: ['assigned', 'out_for_delivery', 'delivered'] },
    },
    include: { orderItems: true },
    orderBy: { id: 'desc' },
  });
  return orders.map(_formatOrder);
}

async function createDeliveryPerson(data) {
  const person = await prisma.deliveryPerson.create({
    data: { name: data.name, phone: data.phone, passwordHash: data.password_hash },
  });
  return person.id;
}

module.exports = {
  prisma,
  seedIfEmpty,
  isValidTransition,
  getActiveMenuItems,
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getDeliveryPersonByPhone,
  getDeliveryPersonById,
  getActiveDeliveryPersons,
  getOrdersForDelivery,
  createDeliveryPerson,
};

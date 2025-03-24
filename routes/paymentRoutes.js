const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

// Validate card number using Luhn algorithm
const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.toString().split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Validate shipping address
const validateShippingAddress = (address) => {
  const required = ['street', 'city', 'state', 'postalCode', 'country'];
  return required.every(field => 
    address[field] && 
    typeof address[field] === 'string' && 
    address[field].trim().length > 0
  );
};

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Mock order creation in test mode
    const order = {
      id: 'order_' + Date.now(),
      amount: amount * 100,
      currency: 'INR',
      receipt: 'order_' + Date.now(),
    };
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    // Always verify in test mode
    res.json({ verified: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Process payment and create order
router.post('/process', async (req, res) => {
  try {
    const {
      amount,
      cardNumber,
      expiryDate,
      cvv,
      name,
      email,
      items,
      shippingAddress,
      discount,
      subtotal
    } = req.body;

    // Validate required fields
    if (!cardNumber || !expiryDate || !cvv || !name || !email || !shippingAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }

    // Validate card number using Luhn algorithm
    if (!validateCardNumber(cardNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid card number'
      });
    }

    // Validate shipping address
    if (!validateShippingAddress(shippingAddress)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid shipping address. Please provide all required fields.'
      });
    }

    // Validate expiry date
    const [month, year] = [expiryDate.slice(0, 2), expiryDate.slice(2)];
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    if (expMonth < 1 || expMonth > 12 || expYear < currentYear || 
        (expYear === currentYear && expMonth < currentMonth)) {
      return res.status(400).json({
        success: false,
        error: 'Card has expired'
      });
    }

    // Mock payment processing - in test mode, always successful for test card
    const isTestCard = cardNumber === '4111111111111111';
    const isPaymentSuccessful = isTestCard;

    if (!isPaymentSuccessful) {
      return res.status(400).json({
        success: false,
        error: 'Payment failed. Please use test card number: 4111 1111 1111 1111'
      });
    }

    // Generate unique IDs
    const orderId = 'ORD-' + uuidv4().slice(0, 8).toUpperCase();
    const transactionId = 'TXN-' + uuidv4().slice(0, 8).toUpperCase();
    const trackingNumber = 'TRK-' + uuidv4().slice(0, 8).toUpperCase();

    // Calculate estimated delivery date (7 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

    // Parse prices and ensure they're valid numbers
    const parsedItems = items.map(item => ({
      productId: item.id,
      name: item.name,
      price: typeof item.price === 'string' ? 
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 
        parseFloat(item.price),
      size: item.size,
      quantity: parseInt(item.quantity || 1, 10),
      image: item.image
    }));

    const parsedSubtotal = typeof subtotal === 'string' ? 
      parseFloat(subtotal.replace(/[^0-9.-]+/g, "")) : 
      parseFloat(subtotal);

    const parsedAmount = typeof amount === 'string' ? 
      parseFloat(amount.replace(/[^0-9.-]+/g, "")) : 
      parseFloat(amount);

    // Create new order
    const order = new Order({
      orderId,
      transactionId,
      customer: {
        name,
        email
      },
      shippingAddress,
      items: parsedItems,
      subtotal: parsedSubtotal,
      discount: discount ? {
        code: discount.code,
        type: discount.type,
        value: discount.value,
        amount: parseFloat(discount.amount)
      } : null,
      totalAmount: parsedAmount,
      status: 'PENDING',
      paymentStatus: 'COMPLETED',
      estimatedDelivery,
      trackingNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await order.save();

    // Send success response with order details
    res.json({
      success: true,
      message: 'Payment successful',
      order: {
        orderId: order.orderId,
        transactionId: order.transactionId,
        customer: order.customer,
        shippingAddress: order.shippingAddress,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        amount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        estimatedDelivery: order.estimatedDelivery,
        trackingNumber: order.trackingNumber,
        timestamp: order.createdAt
      }
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your payment. Please try again.'
    });
  }
});

// Get order status
router.get('/order/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        paymentStatus: order.paymentStatus,
        estimatedDelivery: order.estimatedDelivery,
        trackingNumber: order.trackingNumber,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the order status'
    });
  }
});

// Update order status (this would typically be called by admin or shipping service)
router.put('/order/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const order = await Order.findOne({ orderId: req.params.orderId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    res.json({
      success: true,
      order: {
        orderId: order.orderId,
        status: order.status,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating the order status'
    });
  }
});

// Track order status
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ 
      trackingNumber: req.params.trackingNumber 
    }).select('orderId status estimatedDelivery createdAt updatedAt');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Generate some mock tracking events
    const events = [];
    const orderDate = new Date(order.createdAt);
    
    events.push({
      status: 'ORDER_PLACED',
      date: orderDate,
      location: 'Online'
    });

    if (order.status !== 'PENDING') {
      events.push({
        status: 'PROCESSING',
        date: new Date(orderDate.getTime() + 1000 * 60 * 60), // 1 hour later
        location: 'Warehouse'
      });
    }

    if (['SHIPPED', 'DELIVERED'].includes(order.status)) {
      events.push({
        status: 'SHIPPED',
        date: new Date(orderDate.getTime() + 1000 * 60 * 60 * 24), // 1 day later
        location: 'Distribution Center'
      });
    }

    if (order.status === 'DELIVERED') {
      events.push({
        status: 'DELIVERED',
        date: order.updatedAt,
        location: 'Destination'
      });
    }

    res.json({
      trackingNumber: req.params.trackingNumber,
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      events
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracking information' });
  }
});

module.exports = router;

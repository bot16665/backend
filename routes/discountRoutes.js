const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// Validate discount code
router.post('/validate', async (req, res) => {
  try {
    const { code, amount } = req.body;
    
    if (!code || !amount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Code and amount are required' 
      });
    }

    const discount = await Discount.findOne({ 
      code: code.toUpperCase(),
      active: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
      $or: [
        { usageLimit: null },
        { usageCount: { $lt: '$usageLimit' } }
      ]
    });

    if (!discount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or expired discount code' 
      });
    }

    if (amount < discount.minAmount) {
      return res.status(400).json({ 
        success: false, 
        error: `Minimum order amount of ₹${discount.minAmount} required` 
      });
    }

    let discountAmount;
    if (discount.type === 'PERCENTAGE') {
      discountAmount = (amount * discount.value) / 100;
      if (discount.maxDiscount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscount);
      }
    } else {
      discountAmount = discount.value;
    }

    res.json({
      success: true,
      discount: {
        code: discount.code,
        type: discount.type,
        value: discount.value,
        amount: discountAmount
      }
    });
  } catch (error) {
    console.error('Discount validation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to validate discount code' 
    });
  }
});

// Apply discount code (increment usage count)
router.post('/apply', async (req, res) => {
  try {
    const { code } = req.body;
    
    const discount = await Discount.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usageCount: 1 } },
      { new: true }
    );

    if (!discount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid discount code' 
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Discount application error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to apply discount code' 
    });
  }
});

module.exports = router;

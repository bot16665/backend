const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Discount = require('../models/Discount');

dotenv.config();

const discounts = [
  {
    code: 'WELCOME20',
    type: 'PERCENTAGE',
    value: 20,
    minAmount: 1000,
    maxDiscount: 2000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    usageLimit: 1000,
    active: true
  },
  {
    code: 'FLAT500',
    type: 'FIXED',
    value: 500,
    minAmount: 2000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    usageLimit: 500,
    active: true
  },
  {
    code: 'SHOES10',
    type: 'PERCENTAGE',
    value: 10,
    minAmount: 0,
    maxDiscount: 1000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    usageLimit: null, // unlimited usage
    active: true
  }
];

async function seedDiscounts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing discounts
    await Discount.deleteMany({});
    console.log('Cleared existing discounts');

    // Insert new discounts
    const result = await Discount.insertMany(discounts);
    console.log('Seeded discounts:', result);

    console.log('\nAvailable discount codes:');
    console.log('-------------------------');
    discounts.forEach(discount => {
      console.log(`${discount.code}: ${discount.type === 'PERCENTAGE' ? discount.value + '%' : '₹' + discount.value} off`);
      console.log(`Min Amount: ₹${discount.minAmount}`);
      if (discount.maxDiscount) {
        console.log(`Max Discount: ₹${discount.maxDiscount}`);
      }
      console.log(`Valid until: ${discount.validUntil.toLocaleDateString()}`);
      console.log('-------------------------');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding discounts:', error);
    process.exit(1);
  }
}

seedDiscounts();

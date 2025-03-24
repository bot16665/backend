require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // Get all products
    const products = await Product.find();
    
    // Display total count
    console.log(`Total Products: ${products.length}\n`);

    // Display by gender
    const menProducts = products.filter(p => p.gender === 'Men');
    const womenProducts = products.filter(p => p.gender === 'Women');
    console.log('Gender Distribution:');
    console.log(`Men's Products: ${menProducts.length}`);
    console.log(`Women's Products: ${womenProducts.length}\n`);

    // Display by category
    const categories = [...new Set(products.map(p => p.category))];
    console.log('Category Distribution:');
    categories.forEach(category => {
      const count = products.filter(p => p.category === category).length;
      console.log(`${category}: ${count} products`);
    });

    // Display price range
    const prices = products.map(p => p.price);
    console.log('\nPrice Range:');
    console.log(`Lowest Price: ₹${Math.min(...prices)}`);
    console.log(`Highest Price: ₹${Math.max(...prices)}\n`);

    // Display all products in a table format
    console.log('All Products:');
    console.table(products.map(p => ({
      name: p.name,
      category: p.category,
      price: `₹${p.price}`,
      gender: p.gender
    })));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

checkData();

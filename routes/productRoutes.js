const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add a product
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    // Transform product to include id field
    const transformedProduct = {
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      gender: product.gender,
      thumbnails: product.thumbnails
    };
    res.status(201).json({ message: "Product added successfully", product: transformedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products with search and filters
router.get("/", async (req, res) => {
  try {
    const { search, category, gender, minPrice, maxPrice } = req.query;
    
    // Build query object
    const query = {};
    
    // Add search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category filter
    if (category) {
      query.category = category;
    }

    // Add gender filter
    if (gender) {
      query.gender = gender;
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = minPrice.toString();
      }
      if (maxPrice) {
        query.price.$lte = maxPrice.toString();
      }
    }

    const products = await Product.find(query);
    // Transform products to include id field
    const transformedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      gender: product.gender,
      thumbnails: product.thumbnails
    }));
    res.json(transformedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Transform product to include id field
    const transformedProduct = {
      id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      gender: product.gender,
      thumbnails: product.thumbnails
    };
    res.json(transformedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get price range
router.get("/meta/price-range", async (req, res) => {
  try {
    const products = await Product.find({}, { price: 1 });
    const prices = products.map(p => parseFloat(p.price.replace(/[^0-9.-]+/g, "")));
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
    res.json(priceRange);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  transactionId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{6}$/.test(v);
        },
        message: props => `${props.value} is not a valid pincode!`
      }
    },
    phone: { 
      type: String, 
      required: true,
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  },
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true }
  }],
  subtotal: { 
    type: Number, 
    required: true,
    min: 0 
  },
  discount: {
    code: String,
    type: { 
      type: String,
      enum: ['PERCENTAGE', 'FIXED']
    },
    value: Number,
    amount: Number
  },
  totalAmount: { 
    type: Number, 
    required: true,
    min: 0 
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  estimatedDelivery: { 
    type: Date, 
    required: true 
  },
  trackingNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for order age
orderSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to check if order is delivered
orderSchema.methods.isDelivered = function() {
  return this.status === 'DELIVERED';
};

// Method to check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  return ['PENDING', 'PROCESSING'].includes(this.status);
};

// Method to check if order is delayed
orderSchema.methods.isDelayed = function() {
  return this.estimatedDelivery < new Date() && !this.isDelivered();
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

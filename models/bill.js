var mongoose = require('mongoose');


const billSchema = mongoose.Schema({
    billno: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    amount: { type: String, required: true, default: 0 }, // Total bill amount
    products: [], // Array of products
  
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
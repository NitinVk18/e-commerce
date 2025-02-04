// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CartSchema = new Schema({
    name:String,
    id: Number,
    qty:Number
});



module.exports = mongoose.model('Cart', CartSchema);

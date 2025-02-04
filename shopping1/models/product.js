// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ProductSchema = new Schema({
    id: {type:Number, 
        unique:true,
        autoincrement : true} ,
    name : String,
    price : Number,
    quantity : Number
});



module.exports = mongoose.model('Product', ProductSchema);

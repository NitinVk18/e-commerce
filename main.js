
var express = require('express');
var mongoose = require('mongoose');
var app = express();
const path = require("path");
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
const multer = require('multer');
var port = process.env.PORT || 4200;
var cors = require("cors")

app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cors())
app.use('/assets', express.static(__dirname + '/public'));

var Product = require('./models/product');
var Login = require('./models/login');
var Cart = require('./models/cart');
const billModel = require('./models/bill')

mongoose.connect(database.url);

console.log(database.url);

var imagename = '';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		console.log(file);

		imagename = Date.now() + path.extname(file.originalname) + '';
		console.log(imagename);
		cb(null, imagename); // this will store the file in public folder with imagename created
	}
});

const upload = multer({ storage: storage });




app.post('/login', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	var query = { username: username, password: password };
	let result = await Login.find(query);
	res.json(result)

})

// app.get('/api/employeeslogin/:id', async function(req, res) {
// 	try {
// 		let id = req.params.id;
// 		console.log(id);
// 		var query = { id: id };
// 		let employee = await Employee.find(query);
// 		console.log(employee);
// 		res.render('profile', {
// 			results: employee
// 		});
// 	} catch (err) {
// 		res.send(err);
// 	}
// });

// app.get('/admin', async function(req, res) {
// 	// use mongoose to get all todos in the database

// 	let result = await  Employee.find();
//     //res.status(200).json(result);
// 	//let employee = Employee.find().query;
// 	//console.log(res.json(result))
// 	//console.log(result);
// 	res.render('employee_views',{
// 				results: JSON.stringify(result)

// 			  });
// 		 // return all employees in JSON format

// });
// app.get('/api/add',(req, res) => {
// 	res.render("employee_a");
//  });
// create employee and send back all employees after creation


app.post('/product_create', upload.single('file'), (req, res) => {


	// create mongose method to create a new record into collection
	Product.create({
		id: req.body.id,
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.quantity,
		filename: imagename
	});
	console.log("Product created")
	//res.redirect("/")
	res.json("Done")

});

app.get('/viewproduct', async function (req, res) {
	try {


		let pr = await Product.find();
		console.log(pr);
		res.json(pr);
	} catch (err) {
		res.send(err);
	}
});

app.get('/viewcart', async function (req, res) {
	try {


		const result = await Cart.aggregate([{
			$lookup:
			{
				from: 'products', localField: 'id',
				foreignField: 'id', as: 'cart_product'
			}
		}])
		console.log(result)
		result.forEach(prod => {
			console.log(prod.cart_product[0].name)

		})



		console.log("------------------")
		res.json(result);
	} catch (err) {
		res.send(err);
	}
});
app.get('/updatefind/:id', async function (req, res) {
	try {
		let id = req.params.id;
		console.log(id);
		var query = { id: id };
		let pr = await Product.find(query);
		console.log(pr);
		res.json(pr);
	} catch (err) {
		res.send(err);
	}
});




app.post('/productupdate', async function (req, res) {
	try {
		var data = {
			id: req.body.id,
			name: req.body.name,
			price: req.body.price,
			quantity: req.body.quantity
		};
		console.log("hi");
		console.log(data);
		var query = { id: req.body.id };

		// update the employee
		await Product.updateOne(query, data);
		res.redirect("/viewproduct");
	} catch (err) {
		res.send(err);
	}
});

app.get('/addcart/:id', async function (req, res) {
	try {
		console.log(req.params.id);
		let myid = req.params.id;
		Cart.create({
			name: "raman",
			email: "aa@us.net",
			id: myid,
			qty: 1
		});
		res.redirect("/viewproduct");
	} catch (err) {
		res.send(err);
	}
});



app.get('/delcart/:id', async function (req, res) {
	try {
		console.log(req.params.id);
		let id = req.params.id;
		await Cart.deleteOne({
			id: id
		});
		res.redirect("/viewcart");
	} catch (err) {
		res.send(err);
	}
});

app.get('/productdelete/:id', async function (req, res) {
	try {
		console.log(req.params.id);
		let id = req.params.id;
		await Product.deleteOne({
			id: id
		});
		res.redirect("/viewproduct");
	} catch (err) {
		res.send(err);
	}
});

// app.get('/api/pswd/:id', async function(req, res) {
// 	try {
// 		let id = req.params.id;
// 		//console.log(id);
// 		var query = { id: id };
// 		let employee = await Employee.find(query);
// 		//console.log(employee);
// 		res.render('assignPswd', {
// 			results: employee
// 		});
// 	} catch (err) {
// 		res.send(err);
// 	}
// });
// app.post('/assignpswd', function(req, res) {
// 	try{
// 		Login.create({
// 			id: req.body.id,
// 			username: req.body.username,
// 			password: req.body.password,
// 			empId: req.body.empId
// 		});
// 		console.log("Password created");
// 		res.redirect("/");

// 	}
// 	catch (err) {
// 		res.send(err);
// 	}
// });


app.post('/showcart/payment', async (req, res) => {
    const { username, name, email, product } = req.body;
    
    // Calculate total amount
    const totalAmount = product.reduce((total, item) => {
        const price = Number(item.productPrice);
        const quantity = Number(item.productQuantity);

        return total + price * quantity;
    }, 0);

    let billNumber;

    const bill = await billModel.find()

    console.log(bill);

    if(bill.length == 0){
        billNumber = 100
    console.log('default billno' +billNumber);
        
    }
    else{
      const heighestbill = await billModel.find({}).sort({'billNo':-1}).limit(1)
      billNumber =  heighestbill[0].billno ;
      
      console.log(heighestbill[0].billno);
      billNumber+=1
      console.log('updated bill no:' +billNumber);
    }

    
    const billproduct = new billModel({
        billno : billNumber,
        username,
        name,
        email,
        products: product,
        totalAmount,
    });

    await billproduct.save();

    res.status(200).json({ message: 'Payment processed successfully.'});
});
app.get('/admin/viewbills', async (req, res) => {
    try {
        const bills = await billModel.find(); // Fetch all bills from the database
        res.json(bills); // Send the bills as JSON
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port);
console.log("App listening on port : " + port);
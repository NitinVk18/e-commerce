
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
const path=require("path");
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var port     = process.env.PORT || 4200;
var cors = require("cors")

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cors())
app.use('/assets',express.static(__dirname + '/public'));

var Product = require('./models/product');
var Login = require('./models/login');
 
mongoose.connect(database.url);

console.log(database.url);



app.post('/login',async (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	
		var query= {username:username,password:password};
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
app.post('/product_create', function(req, res) {
	// create mongose method to create a new record into collection
	Product.create({
		id:req.body.id,
		name : req.body.name,
		price : req.body.price,
		quantity: req.body.quantity
	});
console.log("Product created")
//res.redirect("/")
res.json("Done")

});

app.get('/viewproduct', async function(req, res) {
	try {
		
		
		let pr = await Product.find();
		console.log(pr);
		res.json(pr);
	} catch (err) {
		res.send(err);
	}
});

app.get('/updatefind/:id', async function(req, res) {
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




app.post('/productupdate', async function(req, res) {
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





app.get('/productdelete/:id', async function(req, res) {
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







app.listen(port);
console.log("App listening on port : " + port);
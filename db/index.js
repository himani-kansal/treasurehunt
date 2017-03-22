//importing module for mongo db setup
var mongoose=require('mongoose');
var autoIncrement=require('mongoose-auto-increment');
var express=require('express');
var app=express();

var ejs=require('ejs');

app.set('view engine','ejs');
app.set('views',__dirname+'../views');

//database connection
mongoose.connect('mongodb://xxx:xxx@ds147069.mlab.com:47069/treasurehunt123');

var db=mongoose.connection;
//if any error occurs
db.on('error',console.error.bind(console,'connection error'));

//if successfully connected
db.once('open',function(){
	console.log('Connected To mongoose');
});

autoIncrement.initialize(db);

var userSchema=mongoose.Schema({

username:{
	type:String,
	required:true
	},
email:{
	type:String,
	required:true
	},
phoneno:{
	type:String,
	required:true,
	unique:true
	},
password:{
	type:String,
	required:true
	},
level:{
	type:Number,
	default:1
	}
});

userSchema.plugin(autoIncrement.plugin,{
	model:'User',
	field:'userid',
	type:Number,
	startAt:1,
	incrementBy:1
});
//userSchema.index({email:1, phoneno: 1},{unique:true});

//model setup
var User=mongoose.model('User',userSchema);

exports.addUser=function(req,res){
	var username=req.body.username;
	var email=req.body.email;
	var phoneno=req.body.phoneno;
	var password=req.body.password;
	User.findOne({phoneno:phoneno},function(err,user){ 
	if(user)
	{console.log('The user already exist');
	 res.redirect('/');
	}
	else
	{
		var user=new User({
		username:username,
		email:email,
		phoneno:phoneno,
		password:password
	});

	user.save(function(err,info){
			res.render('xunbao',{data:info});
	});

	}
	});
	//res.send(username);	
	
};

exports.loginUser=function(req,res){
var phoneno1=req.body.phoneno1;
var password1=req.body.password1;
User.findOne({phoneno:phoneno1},function(err,user){
	if(user)
	{
		res.render('xunbao',{data:user});
	}
	else
	{
		res.redirect('/');
	}
});

};

var questionSchema=mongoose.Schema({
	question:{
		type:String,
		required:true
	},
	answer:{
		type:String,
		required:true
	}
});

questionSchema.plugin(autoIncrement.plugin,{
	model:'Question',
	field:'questionid',
	type:Number,
	startAt:1,
	incrementBy:1
});

var Question=mongoose.model('Question',questionSchema);

exports.addquestion=function(req,res){
	var question=new Question({
		question:'what is your name',
		answer:'my name'
	});	
	question.save(function(err,info){
		res.send(info);	
	});
};


//module.exports=User;


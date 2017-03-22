//importing module for mongo db setup
var mongoose=require('mongoose');
//database connection
mongoose.connect('mongodb://xxx:xxx@ds147069.mlab.com:47069/treasurehunt123');

var db=mongoose.connection;
//if any error occurs
db.on('error',console.error.bind(console,'connection error'));

//if successfully connected
db.once('open',function(){
	console.log('Connected To mongoose');
});

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
			res.redirect('/../xunbao');
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
		res.redirect('/../xunbao');
	}
	else
	{
		res.redirect('/');
	}
});

};



//module.exports=User;


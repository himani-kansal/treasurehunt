//Import required modules
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var ejs=require('ejs');

var routes=require('./routes');
var db=require('./db');

//setup of engine
app.set('view engine','ejs');  
app.set('views',__dirname+'/views');

//Setting of Port
app.set('port',(process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',routes);

//for adding new user
app.post('/signup',db.addUser);

app.post('/login',db.loginUser);

app.get('/xunbao',function(req,res){
	res.render('xunbao');
});

//for login the user
//app.post('/login',db.login);





app.get('/*',routes);

//listening on port
app.listen(app.get('port'),function(){
console.log("App listening on port"+app.get('port'));
});



var express=require('express');
var app=express();
app.set('view engine','ejs');
app.set('views',__dirname+'/../views');

app.get('/',function(req,res,next){
	res.render('index');
});


//for displaying the error page
app.get('/*',function(req,res,next){
res.send("<h2>404 |xd Page not Found </h2>");
});



module.exports=app;




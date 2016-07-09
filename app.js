var express = require("express");
var app = express();

app.set("port",process.env.PORT || 3000);

//设定views变量，意为视图存放的目录
//app.set("views",path.join(__dirname,"views"));

//设定view engine变量，意为网页模板引擎
app.set("view engine","jade");

/*app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);*/

//设定静态文件的目录，比如本地文件
//目录为demo/public/images，访问
//网址则显示为http://localhost:3000/images
//app.use(express.static(path.join(__dirname,"public")));


//静态网页模板的监听
/*app.listen(app.get("port"));*/

/*app.get("/",function(req,res){
	res.send("hello,world");
});*/

app.get("/",function(req,res){
	/*var body = "hello,world";
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Content-Type",body.length);
	res.end(body);*/

	res.sendfile("./views/index.html");
});

app.get("/about",function(req,res){
	res.sendfile("./views/about.html");
});

app.get("/article",function(req,res){
	res.sendfile("./views/article.html");
});

app.get("/api",function(request,response){
	response.send({name:"leopold",age:22});
});



var api = require("./routes/api");
app.get("/api",api.index);
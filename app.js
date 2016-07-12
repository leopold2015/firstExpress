var express = require("express");
var path = require("path");
var connect = require('connect');
var bodyParser = require("body-parser");
var app = express();

//设定port变量，以为访问端口
app.set('port',process.env.PORT || 3000);

//设定views变量，意为视图存放的目录
app.set('views',path.join(__dirname,'views'));

//设定view engine变量，意为网页模板引擎
app.set('view engine' ,"jade");


//设定静态文件目录，比如本地文件
//目录为firstExpress/public/images,访问
//网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname,"public")));

app.listen(app.get("port"));


/*app.get('/',function(req,res){
	res.send("Hello,world");
});*/

/*app.get("/delete",function(req,res){
	res.del("Hello,world");
});
app.post("/about",function(req,res){
	res.del("这是第一个德莫");
});
app.put("/put",function(req,res){
	res.del("这是第一个德莫");
})*/

/*app.get('/',function(req,res){
	var body = "hello,world";
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Content-Type",body.length);
	res.end(body);
});*/

app.get("/api",function(request,response){
	response.send({name:"leopold",age:22});
});


//引入自己书写的api模板,发送json数据
var info = require("./routes/api");
app.get("/info",info.index);

//引入自己书写的静态页面模板

/*app.get("/",function(req,res){
	res.sendfile("./views/index.html");
});*/

app.get('/1',function(req,res){
	res.sendfile("./views/index.html");
});

app.get('/about1',function(req,res){
	res.sendfile("./views/about.html");
});	

app.get('/article1',function(req,res){
	res.sendfile("./views/article.html");
});


//动态网页模板

//加载hbs 模板
var hbs = require("hbs");

//指定模板文件的后缀名为html
app.set('view engine','html');

//加载数据模块
var blogEngine = require('./blog');

app.engine('html',hbs.__express);
/*app.use(express.bodyParser());*/

/*app.get('/',function(req,res){
	res.render('index',{title:"最近文章",entries:blogEngine.getBlogEntries()});
});*/

app.get('/about', function(req, res) {
   res.render('about', {title:"自我介绍"});
});

app.get('/article/:id',function(req,res){
	var entry = blogEngine.getBlogEntry(req.params.id);
	res.render('article',{title:entry.title,blog:entry});
});


//Express.Router用法

var router = express.Router();

/*router.get('/',function(req,res){
	res.send('首页');
});*/

router.get('/about',function(req,res){
	res.send('关于');
});

router.route('/api')
	.post(function(req,res){
		res.send("love");
	})
	.get(function(req,res){
		Bear.find(function(err,bears){
			if(err){
				res.send(err);
			}
			res.json(bears);
		});
	});

/*router.use(function(req,res,next){
	console.log(req,method,req.url);
});*/

router.param('name',function(req,res,next,name){
	console.log(name);
	req.name = name;
	next();
});

router.get('/hello/:name',function(req,res){
	res.send('hello'+req.name +'!');
});

app.route('/login')
	.get(function(req,res){
		res.send("this is the login form");
	})
	.post(function(req,res){
		console.log("processing");
		res.send('processing the login form!');
	});

app.use('/',router);






//上传文件
app.get("/",function(req,res){
	res.sendfile("./views/uploadFile.html");
});

// var router = express.Router();
var multer = require('multer');

var uploading = multer({
	dest:__dirname+'../public/uploadis/',
	//设定限制，每次最多上传1个文件，文件大小不超过1mb
	limits:{fileSize:10000000,files:1},
});

/*app.post('/pictures/upload',uploading,function(req,res){
	res.send(req.body);
});*/

module.exports = router





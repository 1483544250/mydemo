
var mongoose = require('mongoose') // 引入 mongoose
var url = "mongodb://localhost:27017/mytest"; // 本地数据库地址
mongoose.connect(url,{ useNewUrlParser: true })

// connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  /*
  mongoose.js ：建立数据库连接用 mongoose.Schema 插入数据
 */
  var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection

  let user = {
    name:String
  }

  var userSchema = Schema(user)
  var User = mongoose.model('User', userSchema); //将schema编译为model构造函数

  // var newUser = new User({name: "xxxxxxxxx"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
  // newUser.save()

  let books = {
    text:String
  }
  var booksSchema = Schema(books)
  var Books = mongoose.model('Books', booksSchema);
  // var newBooks = new Books({text: "xxxxxxxxx"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
  // newBooks.save()
  module.exports = {mongoose,User,Books}
});

var express = require('express')()
var bodyParser = require('body-parser');//用于req.body获取值的
var cors = require('cors')
express.use(cors())
express.use(bodyParser.json())
// 创建 application/x-www-form-urlencoded 编码解析
express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.urlencoded({ extended: true}));

express.get('/',function (request, response) { // 路由
  response.send("hello world!") // 传送HTTP响应
})
express.listen(3000) //监听3000端口，默认localhost: 127.0.0.1 || 0.0.0.0

mongoose.connect(url,{ useNewUrlParser: true }) // connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  /*
  mongoose.js ：建立数据库连接用 mongoose.Schema 插入数据
 */
  var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection
  let user = {
    name:String
  }
  var userSchema = Schema(user)
  var User = mongoose.model('User', userSchema); //将schema编译为model构造函数

  // var newUser = new User({name: "xxxxxxxxx"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
  // newUser.save()

  let memorandum = {
    text:String
  }
  var memorandumSchema = Schema(memorandum)
  var memorandum = mongoose.model('memorandum', memorandumSchema);

  express.post("/submitText",function (request, response) { // 添加备忘录
    let data = request.body
    console.log(data)
    let addText = new Books(data)
    addText.save()
    response.send(JSON.stringify(data))
  })

  // express.post("/upDataText",function (request, response) { // 更新备忘录
  //   // 更新数据的条件查询
  //   var wherestr = {'username': 'kongzhi0707'};

  //   // 执行更新数据
  //   var updatestr = {'password': 'abcdef'};
  //   let data = request.body
  //   console.log(data)
  //   let addText = new Books(data)
  //   addText.save()
  //   response.send(JSON.stringify(data))
  // })
  express.post("/upDataText",function (request, response) { // 查看备忘录
    // 更新数据的条件查询
    var wherestr = {'username': 'kongzhi0707'};

    let data = request.body
    console.log(data)
    var addText = new Books(data)
    addText.save()
    response.send(JSON.stringify(data))
  })
  // var newBooks = new Books({text: "xxxxxxxxx"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
  // newBooks.save()
});

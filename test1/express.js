
const app = require('express')()
const cors = require("cors");
const dateformat = require('dateformat');
const bodyParser = require('body-parser');//用于req.body获取值的

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const monk = require('monk')
const db = monk('localhost:27017/mytest')

app.listen(3000,function () {
  console.log("连接上了")
})
// 添加备忘录
app.post('/books', async (req, res, next) => {
  try {
    const books = db.get('books');
    const userId = req.body.userId
    const text = req.body.text
    const timeStr = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    await books.insert({userId, text, createTime: timeStr,updateTime: timeStr })
    res.json({ code: 0 });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
// 查找备忘录
app.get('/books', async (req, res, next) => { 
  try {
    const userId = req.query.userId
    let pageSize = 10
    let page = 1
    if (req.query.page) {
      page = Number(req.query.page)
    }
    if (req.query.pageSize) {
      pageSize = Number(req.query.pageSize)
    }
    const books = db.get('books');
    const total = await books.count()
    const bookslist = await books.find({ userId }, { sort: { createTime: -1 }, limit: pageSize, skip: (page - 1) * pageSize })
    res.json({ code: 0, data: bookslist, total });
  } catch(err) {
    res.json({ code: -1, msg: 'System Error.' });
    console.error(err);
  }
});
// 更改备忘录
app.patch('/books', async (req, res, next) => { 
  try {
    const books = db.get('books');
    const id = req.body.id
    const text  = req.body.text
    const updateTime = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    const list = await books.findOneAndUpdate({ _id: id }, {
      $set: {
        text,
        updateTime
      }
    });
    if (!list) return res.json({ code: -3, msg: '查找不到该记录' });
    res.json({ code: 0 });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
// 删除备忘录
app.delete('/books', async (req, res, next) => { 
  try {
    const books = db.get('books');
    const id = req.body.id
    const list = await books.remove({ _id: id });
    if (!list) return res.json({ code: -3, msg: '查找不到该记录' });
    res.json({ code: 0 });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
// 注册
app.post('/register', async (req, res, next) => { 
  try {
    const users = db.get('users');
    const username = req.body.username
    const password = req.body.password
    const user = await users.findOneAndUpdate({ username });
    console.log(user)
    if (user.length > 0) {
      return res.json({ code: -2, msg: '该用户名已被注册' });
    } else {
      const timeStr = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
      const newuser = await users.insert({
        username,
        password,
        createTime: timeStr,
        updateTime: timeStr
      })
      res.json({ code: 0, data: newuser });
    }
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
// 登录
app.post('/login', async (req, res, next) => { 
  try {
    const users = db.get('users');
    const username = req.body.username
    const password = req.body.password
    const user = await users.findOneAndUpdate({ username, password });
    if (user.length === 0) return res.json({ code: -3, msg: '查找不到该用户' });
    res.json({ code: 0, data: user });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
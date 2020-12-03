
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
app.post('/text', async (req, res, next) => { // 添加备忘录
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
// app.get('/getList/:id', async (req, res, next) => { // 查找备忘录
//   try {
//     const userId = req.params.id
//     const books = db.get('books');
//     const list = await books.find({ userId }, { sort: { createTime: -1 } })
//     res.json({ code: 0, data: list });
//   } catch(err) {
//     res.json({ code: -1, msg: 'System Error.' });
//     console.error(err);
//   }
// });
app.post('/getList', async (req, res, next) => { // 查找备忘录
  try {
    const userId = req.body.userId
    let pageSize = 10
    let page = 1
    if (req.body.page) {
      page = Number(req.body.page)
    }
    if (req.body.pageSize) {
      pageSize = Number(req.body.pageSize)
    }
    const books = db.get('books');
    const total = await books.count()
    const list = await books.find({ userId }, { sort: { createTime: -1 }, limit: pageSize, skip: (page - 1) * pageSize })
    res.json({ code: 0, data: list, total });
  } catch(err) {
    res.json({ code: -1, msg: 'System Error.' });
    console.error(err);
  }
});
app.post('/updata', async (req, res, next) => { // 更改备忘录
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

app.post('/remove', async (req, res, next) => { // 删除备忘录
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

app.post('/register', async (req, res, next) => { // 注册
  try {
    const users = db.get('users');
    const username = req.body.username
    const password = req.body.password
    const list = await users.find({ username: username });
    if (list.length > 0) {
      return res.json({ code: -2, msg: '该用户名已被注册' });
    } else {
      const timeStr = dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss');
      await users.insert({
        username,
        password,
        createTime: timeStr,
        updateTime: timeStr
      })
      const newuser = await users.find({ username: username })
      res.json({ code: 0, data: newuser });
    }
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
app.post('/login', async (req, res, next) => { // 登录
  try {
    const users = db.get('users');
    const username = req.body.username
    const password = req.body.password
    const list = await users.find({ username, password });
    if (list.length === 0) return res.json({ code: -3, msg: '查找不到该用户' });
    res.json({ code: 0, data: list });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
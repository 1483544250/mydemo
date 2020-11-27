
const app = require('express')()
const cors = require("cors");
const bodyParser = require('body-parser');//用于req.body获取值的

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const monk = require('monk')
const db = monk('localhost:27017/mytest')

app.listen(3000,function () {
  console.log("连接上了")
})
app.post('/submitText', async (req, res, next) => { // 添加备忘录
  try {
    const books = db.get('books');
    const data = req.body
    books.insert(data)
    res.json({ code: 0, msg: JSON.stringify(data) });
  } catch(error) {
    console.error(error);
    res.json({ code: -1, msg: 'System Error' });
  }
});
app.get('/text', async (req, res, next) => { // 查找备忘录
  try {
    const books = db.get('books');
    const list = await books.find()
    res.json({ code: 0, data: list });
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
    const list = await books.findOneAndUpdate({ _id: id }, {
      $set: {
        text
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
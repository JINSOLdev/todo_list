// Model
const TodoTask = require("../models/todoTask");

// KST Setting
var moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

// 첫 페이지
exports.get = function (req, res) {
  console.log("----------------!!Todo!!--------------------");
  TodoTask.find({}, null, { sort: { date: -1 } }, (err, tasks) => {
    res.render("todo", { todoTasks: tasks });
  });
};

// 작성
exports.write = async function (req, res) {
  try {
    const todoTask = new TodoTask({
      content: req.body.content,
      date: moment().format("YYY-MM-DD HH:mm:ss"), // 현재시간
    });
    await todoTask.save(); // save()를 통해 db에 저장
    console.log("=========Success!! Save New TodoTask===========");
    res.redirect("/todo"); // localhost:3000/todo로 귀환
  } catch (err) {
    console.err("======Fail!!! Save TodoTask======");
    res.redirect("/todo");
  }
};

// 편집
exports.edit = function (req, res) {
  const id = req.params.id; // 파라미터로 받은 id를 id에 저장
  TodoTask.find({}, null, { sort: { date: -1 } }, (err, tasks) => {
    // db에서 조회해서
    res.render("todo-edit", { todoTasks: tasks, idTask: id }); // todo-edit.ejs에 id와 함께 보낸다.
  });
};

// 수정
exports.update = function (req, res) {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
    if (err) {
      console.log("===Success!! Update TodoTask===");
      console.log("id: " + id + "\nchanged content: " + req.body.content);
      res.redirect("/todo");
    }
  });
};

// 삭제
exports.remove = function (req, res) {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log("=====Fail!!! Remove TodoTask=====");
      console.error(err);
    }
    console.log("=== Success!! Remove TodoTask ===");
    console.log("id: " + id);
    res.redirect("/todo");
  });
};

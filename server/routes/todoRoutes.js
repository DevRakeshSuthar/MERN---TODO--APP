const express = require("express");
const router = express.Router();
const Todo = require("../modals/todo");

//  GET ALL TODO
router.route("/").get((req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

//  ADD TODO AND UPDATE TODO

router.route("/add").post(async (req, res) => {
  try {
    if (req.body.id == "") {
      const todo_title = req.body.todo_title;
      const todo_description = req.body.todo_description;
      const todo_date = Date.parse(req.body.todo_date);

      const newTodo = new Todo({
        todo_title,
        todo_description,
        todo_date,
      });

      newTodo
        .save()
        .then(() => res.json("TODO added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } else {
      let updateTodo = await Todo.findByIdAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            todo_title: req.body.todo_title,
            todo_description: req.body.todo_description,
            todo_date: req.body.todo_date,
          },
        },
        { new: true }
      );
      updateTodo.save();
      res.json({
        data: updateTodo,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//  find by id
router.route("/:id").get((req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      console.log(todo);
      res.json(todo);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//  DELETE TODO

router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

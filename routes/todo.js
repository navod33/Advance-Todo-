const router = require('express').Router();
const User = require('../model/User');
const Todo = require('../model/Todo');
const verify = require('../middleware/auth');

//create
//api/todo/create
router.post('/create', verify, async (req, res) => {
  const Todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    createdBy: req.user._id,
  });

  try {
    const todoSave = await Todo.save();
    res.send(todoSave);
  } catch (err) {
    res.status(400).send(err);
  }
});

//delete
//api/todo/delete
router.delete('/delete', verify, async (req, res) => {
  try {
    const todoDelete = await Todo.findByIdAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    res.send(todoDelete);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update
//api/todo/update
router.put('/update', verify, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    // Update the Todo item fields
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.isDone = req.body.isDone;

    const updatedTodo = await todo.save();
    res.send(updatedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

//todo-list
//api/todo/todo-list
router.get('/create', verify, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      createdBy: req.user._id,
    });
    res.send(todoSave);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

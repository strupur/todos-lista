const express = require('express');
const router = express.Router();

const todoListControllers = require('../controllers/todolist.controllers');

router.get("/todos",  todoListControllers.getToDoList)

router.post("/todos", todoListControllers.createToDoList)

router.get("/todos/:id",  todoListControllers.getToDoListById)

router.delete("/todos/:id",  todoListControllers.deleteToDoList)

router.put("/todos/:id",  todoListControllers.updateToDoList)



module.exports = router;

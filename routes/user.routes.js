const express = require('express');
const router = express.Router();
// const User = require('../models/user.model');
const userControllers = require('../controllers/user.controllers');

router.get("/users",  userControllers.getUsers)

router.post("/users", userControllers.createUser)

router.get("/users/:id",  userControllers.getUserById)

router.delete("/users/:id",  userControllers.deleteUser)

router.put("/users/:id",  userControllers.updateUser)

router.post("/login", userControllers.login)

module.exports = router;

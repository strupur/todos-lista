const express = require('express');
const app = express();

const todoRoutes = require('./routes/todolist.routes')

app.use( express.json());

app.use([ todoRoutes ])

module.exports = app;
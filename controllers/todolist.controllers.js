const Todo = require("../models/todolist.model");

async function getToDoList(req, res) {
    try {

        const todos = await Todo.find();

        console.log(todos);

        return res.status(200).send(todos);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener lista de tarea")
    }
}


async function createToDoList(req, res) {

    if (!req.body.titulo) {
        return res.status(400).send({
            ok: false,
            message: "El Titulo es requerido"
        })
    }

    if (!req.body.descripcion) {
        return res.status(400).send({
            ok: false,
            message: "El Descripcion es requerido"
        })
    }

    const todo = new Todo(req.body);

    todo.save().then((nuevoTodo) => {

        console.log(nuevoTodo);
        res.status(201).send(nuevoTodo);

    }).catch(error => {
        console.log(error);

        res.send("La tarea no se pudo crear");
    })
}


async function getToDoListById(req, res) {

    try {

        const { id } = req.params;

        const todo = await Todo.findById(id);

        return res.status(200).send({
            ok: true,
            message: "El Titulo fue encontrado",
            todo: todo
        })

    } catch (error) {
        console.log(error);

        return res.status(500).send("Error al obtener Titulo en la DB");
    }

}


async function deleteToDoList(req, res) {
    try {

        const { id } = req.params

        const deletedTodo = await Todo.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El titulo fue borrado correctamente!",
            deletedTodo: deletedTodo

        })
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            message: "Error al borrar el titulo"
        });
    }
}


async function updateToDoList(req, res) {
    try {

        const { id } = req.params

       

        const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })

        console.log(todo);

        return res.status(200).send({
            ok: true,
            message: "Se actualizo el titulo correctamente",
            todo: todo
        })

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el titulo"
        });
    }
}

module.exports = {
    getToDoList,
    createToDoList,
    getToDoListById,
    deleteToDoList,
    updateToDoList
    
}
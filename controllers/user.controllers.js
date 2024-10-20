const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


async function getUsers(req, res) {
    try {

        const users = await User.find();

        console.log(users);

        return res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener usuario")
    }
}


async function createUser(req, res) {

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

    const user = new User(req.body);

    user.save().then((nuevoUser) => {

        console.log(nuevoUser);
        res.status(201).send(nuevoUser);

    }).catch(error => {
        console.log(error);

        res.send("el usuario no se pudo crear");
    })
}


async function getUserById(req, res) {

    try {

        const { id } = req.params;

        const user = await User.findById(id);

        return res.status(200).send({
            ok: true,
            message: "El Titulo fue encontrado",
            user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).send("Error al obtener Titulo en la DB");
    }

}


async function deleteUser(req, res) {
    try {

        const { id } = req.params

        const deletedUser = await User.findByIdAndDelete(id)

        return res.status(200).send({
            ok: true,
            message: "El titulo fue borrado correctamente!",
            deletedUser

        })
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            message: "Error al borrar el titulo"
        });
    }
}


async function updateUser(req, res) {
    try {

        const { id } = req.params

       

        const user = await User.findByIdAndUpdate(id, req.body, { new: true })

        console.log(user);

        return res.status(200).send({
            ok: true,
            message: "Se actualizo el titulo correctamente",
            user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el titulo"
        });
    }
}


async function login(req, res) {
    try {

        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(400).send({
                message: "Email y contraseña son requeridos"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send({
                message: "Alguno de los dato son incorrecto"
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).send({
                message: "Alguno de los dato son incorrecto"
            })
        }

        user.password = undefined;
        user.__v = undefined;

        const token = jwt.sign(user.toJSON(), SECRET, { expiresIn: '1h' });

        console.log(token);


        return res.status(200).send({
            ok: true,
            message: "Login exitoso",
            user,
            token
        })

    } catch (error) {
        console.log(error);

        return res.status(500).send({
            ok: false,
            message: "Error al autenticar usuario"
        });
    }
}




module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    login
}
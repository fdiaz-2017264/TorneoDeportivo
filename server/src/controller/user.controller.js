'use strict'

const User = require('../model/user.model');
const { validateData, encrypt, searchUser, checkPass, checkPermission, checkUpdate, checkUpdateAdmin } = require('../utils/validate');
const jwt = require('../services/jwt')


exports.test = (req, res) => {
    res.send({ message: 'Hola' });
}

exports.userRegister = async (req, res) => {

    try {
        const params = req.body;
        let data = {
            name: params.name,
            username: params.username,
            password: params.password,
            role: 'CLIENT'
        }
        let msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        let already = await searchUser(data.username);
        if (already) return res.status(400).send({ message: 'Usuario en uso' });
        data.email = params.email;
        data.password = await encrypt(params.password);
        let user = new User(data)
        await user.save();
        return res.send({ message: 'Usuario creado' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving User' })
    }

}

exports.login = async (req, res) => {
    try {
        const params = req.body;
        let data = {
            username: params.username,
            password: params.password
        }
        let msg = validateData(data);

        if (msg) return res.status(400).send(msg)
        let alreadyUse = await searchUser(data.username);
        if (alreadyUse && await checkPass(data.password, alreadyUse.password)) {
            let token = await jwt.createToken(alreadyUse);
            delete alreadyUse.password;

            return res.send({ token, message: 'Bienvenido!', alreadyUse })
        } else return res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Failed to login' });
    }
}

exports.deleteUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const access = await checkPermission(userId, req.user.sub);

        if (access == false)
            return res.status(403).send({ message: 'Usuairo no autorizado' });
        const deletedUser = await User.findOneAndDelete({ _id: userId });
        if (deletedUser) {
            return res.send({ deletedUser, message: 'Usuario eliminado' })
        } else {
            res.send({ message: 'Usuario no encontrado' })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Failed to delete User' });
    }

}

exports.updateUser = async (req, res) => {

    try {
        const params = req.body;
        const userId = req.params.id;

        const userExist = await User.findOne({ _id: userId })
        if (!userExist)
            return res.send({ message: 'Usuario no encontrado' })

        const access = await checkPermission(userId, req.user.sub);
        if (access === false)
            return res.status(401).send({ message: 'Usuario no autorizado' })

        const validateUp = await checkUpdate(params);
        if (validateUp === false)
            return res.status(400).send({ message: 'Parametros invaldos o no tienes autorización' });

        let nameUsed = await searchUser(params.username);
        if (nameUsed && userExist.username != params.username)
            return res.send({ message: 'Usuario en uso' });

        const updateUser = await User.findOneAndUpdate({ _id: userId }, params, { new: true }).lean();
        if (updateUser) {
            res.send({ updateUser, message: 'Usuario actualizado' });
        } else {
            return res.send({ message: 'Usuario no actualizado' });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Failed to update User' })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.send({ message: 'Usuarios encontrados:', users })

    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Search error' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.send({ message: 'Usuario no encontrado' });
        } else {
            return res.send({ message: 'Usuario encontrado:', user });
        }
    } catch (error) {
        console.log(err);
        return res.status(500).send({ err, message: 'Search error' });
    }
}

exports.delete = async (req, res) => {
    try {

        const userId = req.params.id;
        const searchUser = await User.findOne({ _id: userId })

        if (!searchUser) return res.send({ message: 'Acción no autorizada' });
        if (searchUser.role === 'ADMIN') return res.send({ message: 'Acción no autorizada' });
        const userDeleted = await User.findOneAndDelete({ _id: userId });

        if (!userDeleted) return res.send({ message: 'Acción no autorizada' });
        return res.send({ userDeleted, message: 'Cuenta eliminada', })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Delete error' });
    }
}
exports.update = async (req, res) => {
    try {

        const userId = req.params.id;
        const params = req.body;

        const searchU = await User.findOne({ _id: userId });
        if (!searchU) return res.send({ message: 'Usuario no encontrado' });
        const emptyParams = await checkUpdateAdmin(params);

        if (emptyParams === false) return res.send({ message: 'Parametros vacios o no se pudo actualizar' });
        if (searchU.role === 'ADMIN') return res.send({ message: 'Acción no autorizada' });

        const nameUsed = await searchUser(params.username);
        if (nameUsed && searchU.username != params.username) return res.send({ message: 'Usuario en uso, intente otro' });
        if (params.role != 'ADMIN' && params.role != 'CLIENT') return res.status(400).send({ message: 'Insuficientes permisos' });

        const userUpdated = await User.findOneAndUpdate({ _id: userId }, params, { new: true });
        if (!userUpdated) return res.send({ message: 'Usuario no actualizado' });
        return res.send({ userUpdated, message: 'Usuario actualizado' });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error updating user' });

    }
}
exports.saveUser = async (req, res) => {
    try {

        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            role: params.role
        };

        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const userExist = await searchUser(params.username);
        if (userExist) return res.send({ message: 'Usuario en uso' });

        if (params.role != 'ADMIN' && params.role != 'CLIENT') return res.status(400).send({ message: 'Roll inválido' });
        data.surname = params.surname;
        data.phone = params.phone;
        data.password = await encrypt(params.password);

        const user = new User(data);
        await user.save();
        return res.send({ message: 'Usuario guardado' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving user' });
    }
}

exports.createAdmin = async (req, res) => {
    try {
        if (await User.find() == '' || !await User.findOne({username: 'ADMIN'})) {
            const data = {
                username: 'ADMIN',
                password: 'deportes123',
                role: 'ADMIN'
            }
            data.password = await encrypt(data.password);
            const save = new User(data);
            await save.save();
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

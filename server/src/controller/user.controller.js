'use strict'

const User = require('../model/user.model');
const { validateData, encrypt, searchUser,
    checkPass, checkUpdate, checkPermission,
    checkUpdateAdmin } = require('../utils/validate');
    const jwt = require('../services/jwt');


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
        if(msg) return res.status(400).send(msg);
        let already = await searchUser(data.username);
        if(already) return res.status(400).send({message: 'Username already in use'});
        data.email = params.data;
        data.password = await encrypt(params.password);
        let user = new User(data)
        await user.save();
        return res.send({ message: 'User created' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving User' })
    }

}

exports.login = async(req, res)=>{
    try{
       const params = req.body;
       let data = {
           username: params.username,
           password: params.password
       }
       let msg = validateData(data);
       if(msg) return res.status(400).send(msg)
       let alreadyUse = await searchUser(data.username);
       if(alreadyUse && await checkPass(data.password,alreadyUse.password)){
            let token = await jwt.createToken(alreadyUse);
            delete alreadyUse.password;

            return res.send({ token, message: 'Login successfuly, Welcome!', alreadyUse})
       }else return res.status(401).send({message: 'Username or Password incorrect'});
    } catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to login'});
    }
}
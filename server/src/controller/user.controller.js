'use strict'

const User = require('../model/user.model');
const { validateData, encrypt, searchUser, checkPass, checkPermission, checkUpdate, checkUpdateAdmin} = require('../utils/validate');
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
        if(msg) return res.status(400).send(msg);
        let already = await searchUser(data.username);
        if(already) return res.status(400).send({message: 'Username already in use'});
        data.email = params.email;
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

            return res.send({token, message: 'Login successfuly, Welcome!', alreadyUse})
       }else return res.status(401).send({message: 'Username or Password incorrect'});
    } catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to login'});
    }
}

exports.deleteUser = async(req,res)=>{

    try{
        const userId = req.params.id;
        const access = await checkPermission(userId, req.user.sub);

        if(access == false)
        return res.status(403).send({message: 'Action Denied, you can not delete this user'});
        const deletedUser = await User.findOneAndDelete({_id: userId});
        if(deletedUser){
            return res.send({deletedUser, message: 'User deleted successfully!'})
        }else{
            res.send({message: 'We could not find this user, please check if the user exists'})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to delete User'});
    }
    
}

exports.updateUser = async(req,res)=>{

    try{
        const params = req.body;
        const userId = req.params.id;

        const userExist = await User.findOne({_id: userId})
        if(!userExist)
        return res.send({message: 'We could not find the user, please try again'})

        const access = await checkPermission(userId, req.user.sub);
        if(access === false)
        return res.status(401).send({message: 'Action Denegated, you can not update this user'})

        const validateUp = await checkUpdate(params);
        if (validateUp === false)
        return res.status(400).send({message: 'Action Denegated, invalid params or you dont have permission to update'});

        let nameUsed = await searchUser(params.username);
        if(nameUsed && userExist.username != params.username)
        return res.send({message: 'Name in use, please choose another'});
    
        const updateUser = await User.findOneAndUpdate({_id: userId}, params, {new: true}).lean();
        if(updateUser){
            res.send({updateUser, message: 'User updated successfully!'});
        }else{
            return res.send({message: 'User not updated, please try again'});
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Failed to update User'})
    }
}

exports.getUsers = async(req, res)=>{
    try{
        const users = await User.find();
        return res.send({message: 'Users found:', users})

    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Search error'});
    }
}

exports.getUser= async(req, res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findOne({_id: userId})
    
        if(!user){
            return res.send({message: 'No data for this user'});
    }else{
        return res.send({message: 'User found:', user});
    }
    }catch(error){
        console.log(err);
        return res.status(500).send({err, message: 'Search error'});
    }
}

exports.delete = async(req, res)=>{
    try{

        const userId = req.params.id;
        const searchUser = await User.findOne({_id: userId})
        
        if(!searchUser) return res.send({message: 'Action not allowed'});
        if(searchUser.role === 'ADMIN') return res.send({message: 'Can not delete this user'});
        const userDeleted = await User.findOneAndDelete({_id: userId});

        if(!userDeleted) return res.send({message: 'Action not allowed'});
        return res.send({userDeleted, message: 'Account deleted Successfully!',})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Delete error'});
    }
}
exports.update = async(req, res)=>{
    try{

        const userId = req.params.id;
        const params = req.body;

        const searchU = await User.findOne({_id: userId});
        if(!searchU) return res.send({message: 'User not found, try again'});
        const emptyParams = await checkUpdateAdmin(params);

        if(emptyParams === false) return res.send({message: 'Empty params or params not updated, try again'});
        if(searchU.role === 'ADMIN') return res.send({message: 'Action not allowed'});

        const nameUsed = await searchUser(params.username);
        if(nameUsed && searchU.username != params.username) return res.send({message: 'Username already taken, use another'});
        if(params.role != 'ADMIN' && params.role != 'CLIENT') return res.status(400).send({message: 'Invalid role'});

        const userUpdated = await User.findOneAndUpdate({_id: userId}, params, {new: true});
        if(!userUpdated) return res.send({message: 'User not updated'});
        return res.send({userUpdated, message: 'User updated successfully'});
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error updating user'});

    }
}
exports.saveUser = async(req, res)=>{
    try{
          
        const params = req.body;
        const data = {
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            role: params.role
        };

        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);
        const userExist = await searchUser(params.username);
        if(userExist) return res.send({message: 'Username already in use, use another'});
        
        if(params.role != 'ADMIN' && params.role != 'CLIENT') return res.status(400).send({message: 'Invalid role'});
        data.surname = params.surname;
        data.phone = params.phone;
        data.password = await encrypt(params.password);

        const user = new User(data);
        await user.save();
        return res.send({message: 'User saved successfully!'});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error saving user'});
    }
}

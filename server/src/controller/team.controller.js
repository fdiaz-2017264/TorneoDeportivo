'use strict'

const Equipos = require('../model/team.model');
const validate =require('../utils/validate');

exports.saveEquipos = async(req, res) =>{
    try{
    const params = req.body; 
    const data = {
        name:params.name,
        user: req.user.sub
    }   
    const  msg = validate.validateData(data);
    if(msg) return res.status(400).send(msg); 
    const alreadyName = await Equipos.findOne({name: params.name});
    if(alreadyName) return res.send({message: 'Ya se creo el equipo'}); 
    data.points = params.points;
    data.goals = params.goals
    const equipos = new Equipos(data);
    await equipos.save(); 
    return res.send({message: 'Equipo Creado'})
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error saving Equipo'})
    }
}

exports.equiposDelete = async(req,res)=>{
    try{
        const equipoId = req.params.id;
        const team = await Equipos.findOne({_id: equipoId}).lean();
        const account = await validate.ownAccount(team.user, req.user.sub);
        if(account ) return res.send(account) 
        const delEquipos = await Equipos.findOneAndDelete({_id: equipoId}); 
        if(!delEquipos) return res.status(404).send({message: 'Equipos not found or already deleted'}); 
        return res.send({message: 'Equipos Deleted', delEquipos});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error deleting'});
    }
}


exports.equiposUpdate = async(req,res)=>{
    try{
        const params = req.body; 
        const equiposId = req.params.id; 
        const team = await Equipos.findOne({_id: equiposId}).lean();
        const account = await validate.ownAccount(team.user, req.user.sub);
        if(account ) return res.send(account) 
        const check = validate.checkUpdate(params);
        if(check === false) return res.status(400).send('data is not recivida'); 
        const equiposUpdate = await Equipos.findOneAndUpdate({_id: equiposId}, params, {new: true});
        return res.send({message: 'Category update', equiposUpdate});
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error updating'});
    }
}

exports.getEquipos = async(req,res) =>{
    try{
        const equipo = await Equipos.find();
        return res.send(equipo);
    }catch(err){
        console.log(err);
        return res.status(500).send({err, message: 'Error deleting'});
    }

}
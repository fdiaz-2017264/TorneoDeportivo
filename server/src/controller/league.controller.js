'use strict'

const League = require('../model/league.model');
const {validateData, ownAccount} = require('../utils/validate');
const Tournament = require('../model/tournament.model')

exports.testLeague = (req, res)=>{
    res.send({message: 'Si funciona :)'});
}

exports.saveLeague = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            description: params.description,
            user: req.user.sub,
            
        }
        const league = await League.findOne({name: params.name});
        if(league) return res.status(500).send({message: 'Liga ya existente'});
        const msg = validateData(data);
        if(!msg){
            data.tournament = params.tournament
            const league = new League(data);
            await league.save();
            
            return res.send({message: 'Liga guardada'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updatedLeague = async(req, res)=>{
    try{
        const leagueId = req.params.id;
        const params = req.body;
        const league = await League.findOne({_id: leagueId}).lean();
        if(league.user != req.user.sub) return res.send({message: 'Usuario no autorizado'})
        const account = await ownAccount(league.user, req.user.sub);
        if(account ) return res.send(account)
        const leagueUpdated = await League.findOneAndUpdate({_id: leagueId}, params, {new: true});
        return res.send({message: 'Liga actualizada', leagueUpdated});
    }catch(err){
        console.log(err);
        return err;
    }
}


exports.getLeague = async (req, res)=>{
    try{
        const leagueId = req.params.id;
        const league = await League.findOne({_id: leagueId});
        if(!league){
            return res.send({message: 'No hay datos de esta liga'});
        }else{
            return res.send({message: 'Liga encontrada', league});
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Search error'});
    }
}

exports.getLeagues = async(req, res)=>{
    try{
        const leagues = await League.find();
        return res.send({message: 'Ligas encontradas', leagues});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Search error'})
    }
}


exports.deleteLeague = async (req, res) => {
    try {

        const leagueId = req.params.id;
        const searchLeague = await League.findOne({ _id: leagueId }).lean()
        if (searchLeague.user != req.user.sub) return res.send({ message: 'Acción no permitida' });
        
        const leagueDeleted = await League.findOneAndDelete({ _id: leagueId });

        if (!leagueDeleted) return res.send({ message: 'Acción no permitida' });
        return res.send({ leagueDeleted, message: 'Liga eliminada', })
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Delete error' });
    }
}
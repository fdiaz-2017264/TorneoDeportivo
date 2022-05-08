'use strict'

const League = require('../model/league.model');
const {validateData} = require('../utils/validate');

exports.testLeague = (req, res)=>{
    res.send({message: 'Si funciona :)'});
}

exports.saveLeague = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            description: params.description,
            //marcador: String,
            stage: params.stage
        }
        const msg = validateData(data);
        if(!msg){
            const league = new League(data);
            await league.save();
            return res.send({message: 'League saved'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.deleteLeague = async(req, res)=>{
    try{
        const leagueId = req.params.id;
        const leagueDeleted = await League.findOneAndDelete({leagueId});
        if(!leagueDeleted) return res.status(500).send({message: 'League not found or already deleted'});
        return res.send({leagueDeleted, message: 'League deleted'});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updatedLeague = async(req, res)=>{
    try{
        const leagueId = req.params.id;
        const params = req.body;
        const leagueUpdated = await League.findOneAndUpdate({_id: leagueId}, params, {new: true});
        return res.send({message: 'league updated', leagueUpdated});
    }catch{
        console.log(err);
        return err;
    }
}
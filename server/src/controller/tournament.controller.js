'use strict '

const validate = require('../utils/validate');
const Tournament = require('../model/tournament.model');
const League = require('../model/league.model');
const leagueController = require('./league.controller')

exports.testTour = (req, res) =>{
    return res.send({message: 'Si funciona'})
}

exports.createTournament = async(req, res) =>{

    try {
        const params = req.body;
        //const userId = req.user.sub;
        const data = {
            name: params.name,
            author: req.user.sub
        }
        const tour = await Tournament.findOne({name: params.name});
        if(tour) return res.status(500).send({message: 'Tournament already exist'});
        const msg = validate.validateData(data);
        if(msg) return res.status(400).send(msg);
        data.league = params.league;
        if(params.league == '') {
            const leagueExist = await League.findOne({_id: params.league});
            if(!leagueExist) return res.send({message: 'League not Found'});
        }
        const tournament = new Tournament(data);
        await tournament.save();
        return res.send({message: 'Tournament create '})
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err, message: 'Error saving User' })
    }

}

exports.deleteTournament = async(req, res)=>{
    try {
        const tournamentId = req.params.id;
        const tour = await Tournament.findOne({_id: tournamentId}).lean();
        const tourDelete = await Tournament.findOneAndDelete({_id: tournamentId})
        
        if(!tourDelete) return res.send({message: 'Tournament not found or already deleted'});
        return res.send({message: 'Tournamen deleted:', tourDelete});
    } catch (err) {
        console.log(err);
        return res.status(500).send({err, message: 'Error deleted Tournament'})

    }
}

exports.update = async(req, res)=>{
    try {
        const tournamentId = req.params.id;
        const params = req.body;
        const checkUpdate = await validate.checkUpdate(params);
        if(checkUpdate === false) return res.status(400).send({message: 'Not sending params to update or params cannot update '});
        const tournamentUpdate = await Tournament.findOneAndUpdate({_id: tournamentId}, params, {new:true})
        if(!tournamentUpdate)return res.send({message: 'Tournament does not exist or Tournament not updated'});
        return res.send({message: 'Tournament updated successfully', tournamentUpdate});


    } catch (err) {
        console.log(err);
        return res.status(500).send({err, message: 'Error Update Tournament'})
    }
}

exports.getTournaments = async(req, res)=>{
    try {
        const tournament = await Tournament.find()
        
        return res.send({message: 'Tournament found:', tournament})
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Error getting Tournaments'});
    }
}

exports.getTournament =async(req, res)=>{
 try {
    const tournamentId = req.params.id;
    const tournament = await Tournament.findOne({_id: tournamentId});
    if(!tournament) return res.send({message: 'Product not found'});
        return res.send({message: 'Tournament found:', tournament});
 } catch (err) {
    console.log(err);
    return res.status(500).send({err, message: 'Error getting Tournament'});
 }
}
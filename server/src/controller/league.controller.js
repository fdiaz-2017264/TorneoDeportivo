'use strict'

const League = require('../model/league.model');
const {validateData, ownAccount} = require('../utils/validate');

exports.testLeague = (req, res)=>{
    res.send({message: 'Si funciona :)'});
}

exports.saveLeague = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name,
            description: params.description,
            user: req.user.sub
        }
        const league = await League.findOne({name: params.name});
        if(league) return res.status(500).send({message: 'League already exist'});
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
        const league = await League.findOne({_id: leagueId}).lean();
        const account = await ownAccount(league.user, req.user.sub);
        if(account ) return res.send(account)
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
        const league = await League.findOne({_id: leagueId}).lean();
        const account = await ownAccount(league.user, req.user.sub);
        if(account ) return res.send(account)
        const leagueUpdated = await League.findOneAndUpdate({_id: leagueId}, params, {new: true});
        return res.send({message: 'league updated', leagueUpdated});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.createScore = async (req, res) => {
    try {
        const leagueId = req.params.id;
        const params = req.body;
        const data = {
            //name
            score: [
                {
                    team1: params.team1,
                    results1: params.results1,
                    team2: params.team2,
                    results2: params.results2
                }
            ]

        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        let score = await League.findOneAndUpdate({ _id: leagueId }, data, { new: true });
        //console.log(req.user.sub);
        return res.send({ message: 'Score created', score });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Score not saved' });
    }
}
'use strict'


const { validateData } = require('../utils/validate');
const Score = require('../model/score.model');
const Equipos = require('../model/team.model');


exports.createScore = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            team1: params.team1,
            goals1: params.goals1,
            team2: params.team2,
            goals2: params.goals2,
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);

        const searchT1 = await Equipos.findOne({_id: params.team1});
        const searchT2 = await Equipos.findOne({_id: params.team2});
        const dataT1 ={
            goals: (searchT1.goals + parseInt(data.goals1)),
            value: searchT1.value+(parseInt(data.goals1)*2)
        }
        const dataT2 ={
            goals: (searchT2.goals + parseInt(data.goals2)),
            value: searchT2.value+(parseInt(data.goals2)*3)
        }
        await Equipos.findOneAndUpdate({_id: params.team1}, dataT1, {new:true});
        await Equipos.findOneAndUpdate({_id: params.team2}, dataT2, {new:true});
        const score = new Score(data);
        await score.save();
        return res.send({message: 'Marcador creado', score});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error saving' });
    }
}

exports.getScores = async (req,res) => {
    try{
        const score = await Score.find().lean().populate('team1').populate('team2');
        return res.send({message: 'Marcador encontrad', score});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error searching' });
    }
}
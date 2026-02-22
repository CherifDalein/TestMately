const Task = require('../models/Task');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.simulateTasks = async (req, res) => {
    res.status(202).json({
        message: "Simulation lancée"
    });

    for (let i=0; i<10; i++){
        await sleep(5000);

        try{
            await Task.create({
                title: `Tache numero #${i+1}`,
                status: 'todo',
                createdAt: new Date
            });
            console.log(`Tache numero #${i+1}/10 créée`);
        }catch(err){
            console.error('Erreur de simulation: ', err);
        }
            
    }
};

exports.getTasks = async (req, res) => {
    try{
        const {after} = req.query;
        let filter = {};

        if(after){
            filter.createdAt = {$gt: new Date(after)};
        }

        const tasks = await Task.find(filter)
            .sort({createdAt: 1})
            .limit(20);
        
        res.json(tasks);
    }catch(error){
        res.status(500).json({error: "Erreur de recuperation des taches"});
    }
};
const router = require('express').Router();
const _=require('lodash');
const Reservation = require('../models/reservation');
const Joi = require('joi');
const Film = require('../models/film');


router.get('', async (req,res)=>{
    res.send(await Reservation.find());
})

const validation_schema={
    nomSpectateur : Joi.string().min(3).max(20).required(),
    prenomSpectateur : Joi.string().min(3).max(20).required(),
    idSeance: Joi.string().required(),
    idFilm: Joi.string().required()

}

router.post('', async (req,res)=> {

  
   let validation_res= await Joi.validate(req.body,validation_schema);
   
   if(validation_res.error)
        return res.status(400).send(validation_res.error.details[0].message)
    

    
    let reservation =  new Reservation(_.pick(req.body,['nomSpectateur', 'prenomSpectateur', 'idSeance','idFilm']));
    
    try{
        reservation = await reservation.save();
        let film = await Film.findById(reservation.idFilm);
        
        let seance =  await film.listeSeances.filter(s => s.id === reservation.idSeance )[0];

        

        seance.nbrPlacesDispo = seance.nbrPlacesDispo - 1; 

        // film = await _.merge(film,seance);
        
        // film = await film.save();
        
        res.status(200).send('Reserved!'+ film);
    } catch(error){
        res.status(400).send(error.message);
    }
 
});

router.get('/:id', async (req,res)=> {
    let reservation = reservations.find(reser => reser.id === req.params.id);
    if(!reservation){
        return res.status(404).send(`reservation with this id : ${req.params.id} can't be found `);
    }
    res.send(reservation);
});

const valid_schema_id = {
    id : Joi.string().length(24)
}

router.delete('/:id', async (req,res)=>{
    let valid_res_id= Joi.validate(req.params, valid_schema_id);
    if(valid_res_id.error)
        return res.status(400).send(valid_res_id.error.details[0].message);
   
 
    
    let reservation = await Reservation.findByIdAndDelete(req.params.id); 
    if(!reservation)
    return res.status(404).send(`Reservation with this id  ${req.params.id} is not found`);
        
    console.log(reservation);
    res.send(reservation);
});

module.exports = router;


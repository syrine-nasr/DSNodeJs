const mongoose = require('mongoose');
const filmSchema = new mongoose.Schema({
    nom : String, 
     
    listeActeurs : [String],

    listeSeances : [{
        dateSeance : String,
        tempsSeance : String,
        nbrPlacesDispo: Number
    }]
    
})

const Film = mongoose.model('Film',filmSchema);

module.exports = Film;

//NOTE : la fonction d'enregistrement des données des films dans MongoDB est dans le fichier db.js
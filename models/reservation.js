const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
    nomSpectateur : String, 
    prenomSpectateur: String,
    idSeance: String,
    idFilm: String
    
})

const Reservation = mongoose.model('Reservation',reservationSchema);

module.exports = Reservation;
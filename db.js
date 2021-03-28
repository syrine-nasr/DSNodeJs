const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://SyrineUses:a1b2c3@cluster0.skgln.mongodb.net/DSNodeJsDB?retryWrites=true&w=majority',
{ useNewUrlParser : true, useUnifiedTopology : true})
            .then(()=> console.log('Mongo is up'))
            .catch(err => console.log('Mongo is Down because :', err));

            
            
const Film = require('./models/film');

//save a film

async function saveFilm(){
    let film = new Film({
        nom : 'Les Evadés',
        listeActeurs : ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
        listeSeances : [{
            dateSeance: '25/03/2021',
            tempsSeance: '13h30',
            nbrPlacesDispo: 20
        },
        {
            dateSeance: '27/03/2021',
            tempsSeance: '21h00',
            nbrPlacesDispo: 20
        }]

    })
    console.log(await film.save());
}

// saveFilm();
const express  = require('express');
const app = express();
let data = require('./data');
const bodyParser = require('body-parser');
//utilisation de l'aglorithme de classement ELO - cf. https://www.npmjs.com/package/elo-rank
const EloRank = require('elo-rank');

//ajout du module bodyParser pour exploiter le body de la requête (methode POST en ajax cf: app.js)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//initialisation des variables
let selectedCats = [];
let formerCat1 ='';
let formerCat2='';
let cat1;
let cat2;

//fonction generant une postion de tableau de manière aleatoire
const randomPosition = () => {
  return Math.floor(data.cats.length * Math.random());
}

//fonction attributant un chat de manière aléatoire grace a la fonction randomPosition qui donne une position aleatoire
const randomCat = () => {
  cat1 = data.cats[randomPosition()];
  cat2 = data.cats[randomPosition()];
  return differentCat();
}

//fonction visant à s'assrurer de ne pas avoir 2 chats identitique ou le même duel de chat
const differentCat = () => {
  if(cat1 == cat2 || cat1 == cat2 && cat1 == formerCat1 || cat1 == cat2 && cat1 == formerCat2){
    cat1 = data.cats[randomPosition()];
    return differentCat();
  }
}

//home - route principale
app.get('/', (req, res) => {

  randomCat();

  //variable qui stock les chats selectionnés aleatoirement afin de les renvoyer vers le front
  selectedCats = [cat1, cat2];
  //les variables 'formerCat' servent à stocker les chats du precedent duel pour pouvoir un duel similaire au prochain tour
  formerCat1 = cat1;
  formerCat2 = cat2;

  res.render('index', {cats : selectedCats});
});

//route avec POST pour récuperer la requete ajax du front contenant l'id du chat vainqueur du duel
app.post('/catselection', (req, res) => {

  //declaration d'une nouvelle instance de EloRank
  let elo = new EloRank(15);

  //creation de variables pour les besoins de l'algorithme de ranking
  let catA = cat1.score;
  let catB = cat2.score;

  //Gets expected score for first parameter
  let expectedScoreA = elo.getExpected(catA, catB);
  let expectedScoreB = elo.getExpected(catB, catA);

  if(cat1.id == req.body.selection){
    catA = elo.updateRating(expectedScoreA, 1, catA);
    catB = elo.updateRating(expectedScoreB, 0, catB);
  } else {
    catA = elo.updateRating(expectedScoreA, 0, catA);
    catB = elo.updateRating(expectedScoreB, 1, catB);
  }

  //boucle 'for' visant à affecter le score de l'alogrithme de Elo aux chats
  for(var i=0; i<data.cats.length; i++){
    if(data.cats[i].id == cat1.id){
      data.cats[i].score = catA;
    }
    if(data.cats[i].id == cat2.id){
      data.cats[i].score = catB;
    }
  }
  res.render('index', {cats:selectedCats});
});

app.get('/ranking', (req, res) => {
  //tri des chats en fonction du score (du plus élevé au moins élevé) et transfert des informations vers la page "ranking"
  let catList = data.cats.sort(function(a, b){
  return b.score - a.score;
  });
  res.render('ranking', {cats : catList});
});

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});

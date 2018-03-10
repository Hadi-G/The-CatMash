const express  = require('express');
const app = express();
let data = require('./data');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//initialisation des variables
var selectedCats = [];
let formerCat1;
let formerCat2;
let cat1;
let cat2;

//fonction generant une postion de tableau de manière aleatoire
function randomCat(){
  return Math.floor(data.cats.length * Math.random());
}

//fonction attributant un chat de manière aléatoire grace a la fonction randomCat qui donne une position aleatoire
function selectCat(){
  cat1 = data.cats[randomCat()];
  cat2 = data.cats[randomCat()];
}

//fonction visant à s'assrurer de ne pas avoir 2 chats identitique ou le même duel de chat
function differentCat(){
  if(cat1 == cat2 && cat1 == formerCat1 || cat1 == cat2 && cat1 == formerCat2){
    cat1 = data.cats[randomCat()];
    return differentCat();
  }
}

//home - route principale
app.get('/', (req, res) => {

  selectCat()
  differentCat();

  //variable qui stock les chats selectionnés aleatoirement afin de les renvoyer vers le front
  selectedCats = [cat1, cat2];
  //les variables 'formerCat' servent à stocker les chats du precedent duel pour pouvoir gerer l'absence du duel similaire
  formerCat1 = cat1;
  formerCat2 = cat2;

  res.render('index', {cats : selectedCats});
});

//route avec POST pour récuperer la requete ajax du front contenant l'id du chat vainqueur du duel
app.post('/catselection', (req, res) => {

//boucle 'for' visant ajouter +1 au score du chat vainqueur
  for(var i=0; i<data.cats.length; i++){
    if(data.cats[i].id == req.body.selection){
      data.cats[i].score += 1;
      break;
    }
  }
  res.render('index', {cats:selectedCats});
});

app.get('/classement', (req, res) => {
  let catList = data.cats.sort(function(a, b){
  return b.score - a.score;
  });
  res.render('classement', {cats : catList});
});


app.get('/classementdata', (req, res) => {
  res.json(data.cats);
});

const port = (process.env.PORT || 8080);
app.listen(port, () => {
  console.log('ok ecoute sur port 8080');
});

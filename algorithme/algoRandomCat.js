//Fichier d'algorithme contenant les fonctions pour selectionner un chat de manière aléatoire - route Get

//import de la Data - contenant l'ensemble des chats
let data = require('../data');

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
  selectedCats = [cat1, cat2];
  formerCat1 = cat1;
  formerCat2 = cat2;
  return selectedCats;
}

module.exports = randomCat;

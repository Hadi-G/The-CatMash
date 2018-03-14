//Fichie contenant la fonction utile pour gerer le score des chats - route PUT

//utilisation de l'aglorithme de classement ELO - cf. https://www.npmjs.com/package/elo-rank
const EloRank = require('elo-rank');

const EloRanking = (catAScore, catBScore, data, winner, catAId, catBId) => {
  //declaration d'une nouvelle instance de EloRank
  let elo = new EloRank(15);

  //les informations provenant du front sont sous forme de chaine de caractere, parseInt() permet d'obtenir un type number
  let catA = parseInt(catAScore);
  let catB = parseInt(catBScore);

  //Gets expected score for first parameter
  let expectedScoreA = elo.getExpected(catA, catB);
  let expectedScoreB = elo.getExpected(catB, catA);

  if(winner == 'cat1'){
    catA = elo.updateRating(expectedScoreA, 1, catA);
    catB = elo.updateRating(expectedScoreB, 0, catB);
  } else {
    catA = elo.updateRating(expectedScoreA, 0, catA);
    catB = elo.updateRating(expectedScoreB, 1, catB);
  }

  //boucle 'for' visant à affecter le score de l'alogrithme de Elo aux chats
  for(var i=0; i<data.cats.length; i++){
    if(data.cats[i].id == catAId){
      data.cats[i].score = catA;
    }
    if(data.cats[i].id == catBId){
      data.cats[i].score = catB;
    }
  }
}

module.exports = EloRanking;

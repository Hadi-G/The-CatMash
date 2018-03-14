const express = require('express');
const router = express.Router();
const randomCat = require('./algorithme/algoRandomCat.js');
const EloRanking = require('./algorithme/algoRankingCat.js');
const data = require('./data.js');

//utilisation de l'aglorithme de classement ELO - cf. https://www.npmjs.com/package/elo-rank
const EloRank = require('elo-rank');

//home - route principale
router.get('/', (req, res) => {
  res.render('index', {cats : randomCat()});
});

//route avec PUT pour récuperer la requete ajax du front contenant l'id du chat vainqueur du duel afin de réaliser un update
router.put('/catselection', (req, res) => {
  EloRanking(req.body.catAScore, req.body.catBScore, data, req.body.winner, req.body.catAId, req.body.catBId);
  res.render('index', {cats:randomCat()});
});

//Route de la page ranking.ejs et tri des chats en fonction du score (du plus élevé au moins élevé)
router.get('/ranking', (req, res) => {
  let catList = data.cats.sort(function(a, b){
  return b.score - a.score;
  });
  res.render('ranking', {cats : catList});
});

module.exports = router;

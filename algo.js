
const data = require('./data');

function catSelection(){

  function randomCat(){
    return Math.floor(data.cats.length * Math.random());
  }

  function differentCat(){
    if(cat1 == cat2){
      console.log('idem');
      cat2 = data.cats[randomCat()];
      return differentCat();
    }
  }

  var selectedCats = {};
  var cat1 = data.cats[randomCat()];
  var cat2 = data.cats[randomCat()];

  differentCat();

  selectedCats = { cat1 : cat1, cat2 : cat2};

  return selectedCats;

}

exports.catSelection = catSelection();

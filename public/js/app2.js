//recuperation des balises contenant les id "title" referance au titre de ranking.ejs et "graduationSong" de la baslise <audio>
let title = document.getElementById('title');
let graduationSong = document.getElementById('graduationSong');

//ajout d'evenement d'ecoute au "click" sur l'objet window pour stoper le son et sur le titre pour le reactiver
window.addEventListener('click', songOff, true);

title.addEventListener('click', songOn);

//fonction pour stoper la musique
function songOff(){
  graduationSong.src = '';
}

//fonction pour réenclencher la musique
function songOn(){
  graduationSong.src = "./song/graduation.mp3";
}

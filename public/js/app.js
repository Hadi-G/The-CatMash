//recuperation des balises html contenant les images de chats dans index.ejs
let cat1 = document.getElementById('cat1');
let cat2 = document.getElementById('cat2');

// recuperation du gif animé
let secretLink = document.getElementById('secretLink');

// recuperation de la balise <iframe>
let video = document.getElementById('video');

// recuperation de la balise <audio>
let catSong = document.getElementById('catSong');

//creation d'une fonction generant une requete ajax vers le back-end
//la fonctionalité location.reload() permet de raffraichir la page et de relancer la selection aleatoire de chat
function clickCat(event){

  fetch('https://whispering-shelf-40796.herokuapp.com/catselection',
    {
      method: 'PUT',
      headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
      body: 'catAId='+cat1.dataset.id+'&catAScore='+cat1.dataset.score+'&catBId='+cat2.dataset.id+'&catBScore='+cat2.dataset.score+'&winner='+this.id
    });

    location.reload();
}

//Generation d'evenement au click faisant appel a la fonction et a l'envoie de l'Id en requete ajax
cat1.addEventListener('click', clickCat);

cat2.addEventListener('click', clickCat);

// Evenement d'ecoute au click sur le gif animé générant l'affichage de la vidéo
secretLink.addEventListener('click', videoOn);

//Evenement stopant la vidéo en cickant à l'extétieur de la vidéo sur l'objet window
window.addEventListener('click', videoOff, true);

//fonction d'activation d'affichage de la video initialisée en 'none' dan le CSS, elle passe désormais à 'block'
// cette fonction active également un son MP3 au moment du click
function videoOn(){
  video.style.display='block';
  video.src='https://www.youtube.com/embed/Z8yW5cyXXRc?rel=0&amp;showinfo=0';
  catSong.src='./song/miaulement.mp3';
}

//fonction pour masquer la video en repassant le display à none et en enlevant les liens des balises <iframe> et <audio> pour stoper le son
function videoOff(){
  video.style.display='none';
  video.src='';
  catSong.src='';
}

//recuperation des balises html contenant les images de chats dans index.ejs
let cat1 = document.getElementById('cat1');
let cat2 = document.getElementById('cat2');

//creation d'une fonction generant une requete ajax vers le back-extended
//la fonctionalité location.reload() permet de raffraichir la page et de relancer la selection aleatoire de chat
function clickCat(event){

  fetch('http://localhost:8080/catselection',
    {
      method: 'POST',
      headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
      body: 'selection='+this.dataset.id
    });

    location.reload();

}

//Generation d'evenement au click faisant appel a la fonction et a l'envoie de l'Id en requete ajax
cat1.addEventListener('click', clickCat);

cat2.addEventListener('click', clickCat);

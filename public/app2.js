// let number1 = document.getElementById('number1');
// let number2 = document.getElementById('number2');
// let number3 = document.getElementById('number3');
//
// let body = document.getElementById('body');
//
// console.log(body);
//
//
// //requete ajax du back-end pour recuperer les informations de classement
// fetch('/classementdata',
// {
//   method:'get'
// }).then(function(response){
//
//   return response.json();
//
// }).then(function(data){
//
//   let catList = data.sort(function(a, b){
//     return b.score - a.score;
//   });
//
//   number1.setAttribute('src', catList[0].url);
//   number2.setAttribute('src', catList[1].url);
//   number3.setAttribute('src', catList[2].url);
//
//   // for(let i=3;catList.length-3;i++){
//   //   body.appendChild('br').appendChild('img').setAttribute('src', catList[i].url);
//   // }
//
// });

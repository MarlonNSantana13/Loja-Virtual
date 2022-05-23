import { users } from '../services/service.js'

var userid = getCookie("useruid");

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
var btnLogin = document.getElementById('btnLogin');



//Logout
if (userid != null) {
  
  console.log("Você Está Conectado, UID : "+ userid);  

  loggedInLinks.forEach(item => item.style.display = 'none');
  loggedOutLinks.forEach(item => item.style.display = 'block');
    // APARECER APENAS AS ABAS DE ONLINE

}else{
 
  console.log("Você Está Desconectado, UID : "+ userid); 

  loggedInLinks.forEach(item => item.style.display = 'block');
  loggedOutLinks.forEach(item => item.style.display = 'none');
  // APARECER APENAS AS ABAS DE NÃO ONLINE

}


//Area do LOGIN
btnLogin.addEventListener('click', (e) => {
    var emaillogin = document.getElementById('inputEmail').value;
    var senhalogin = document.getElementById('inputSenha').value;

    //console.log(emaillogin);
   // console.log(senhalogin);

    firebase.auth().signInWithEmailAndPassword(emaillogin, senhalogin)
  .then((userCredential) => {

    var user = userCredential.user;
    var levar = user.uid;
    //console.log("Email do banco : " +user.email);

    enviarCookie("useruid", levar); //criar cookie com o uid do user logado
  
      alert("Senha Correta");
      window.location.href='/';  
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Senha Errada");
    alert("Email ou Senha Inválido !");
  });
});




// AREA DE DESCONECTAR
btnLogout.addEventListener('click', (e) => {
  console.log("cliclou");

  firebase.auth().signOut().then(() => {
      apaga_cookie('useruid'); // apagar o cookie do uid do user logado
      alert("Desconectado");
      window.location.href = '/';
      // Desconectado com Sucesso

  }).catch((error) => {

      alert("Falha a Desconectar");

  });

});




















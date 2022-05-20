
var btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', (e) => {

    var emaillogin = document.getElementById('inputEmail').value;
    var senhalogin = document.getElementById('inputSenha').value;

    firebase.auth().signInWithEmailAndPassword(emaillogin, senhalogin)
  .then((userCredential) => {

    
    // Signed in
    var user = userCredential.user;

    // enviar user pro home



    console.log("UID : " +user.uid);
    console.log("Email : " +user.email);

      alert("Senha Certa");
      window.location.href='/public/home.html';  
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Email ou Senha Inválido !");
  });
});
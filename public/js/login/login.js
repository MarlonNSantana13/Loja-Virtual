
var btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', (e) => {

    var emaillogin = document.getElementById('inputEmail').value;
    var senhalogin = document.getElementById('inputSenha').value;
    console.log(emaillogin);
    console.log(senhalogin);


    firebase.auth().signInWithEmailAndPassword(emaillogin, senhalogin)
  .then((userCredential) => {

    
    // Signed in
    var user = userCredential.user;
    console.log("UID : " +user.uid);
    console.log("Email : " +user.email);
    console.log("Name : " +user.name);
  
      alert("Senha Certa");
      window.location.href='/home.html';  
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Email ou Senha Inválido !");
  });
});
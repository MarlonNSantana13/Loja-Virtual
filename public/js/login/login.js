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
    var levar = user.uid;

    //new
    setCookie("useruid", levar); //criar cookie com o uid do user logado
      //alert("Senha Certa");
    //  window.location.href = '/home.html';
    //new

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

/*
var btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', (e) => {

  var emaillogin = document.getElementById('inputEmail').value;
  var senhalogin = document.getElementById('inputSenha').value;

  console(emaillogin);
  console(senhalogin);

  firebase.auth().signInWithEmailAndPassword(emaillogin, senhalogin)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      setCookie("useruid", user.uid); //criar cookie com o uid do user logado

      alert("Senha Certa");
      window.location.href = '/home.html';


      console.log("UID : " +user.uid);
      console.log("Email : " +user.email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Email ou Senha Inválido !");
    });
});*/





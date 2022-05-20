var btnLogout = document.getElementById('btnLogout');
var userid = getCookie("useruid");

if (userid != null) {
    console.log(userid);
} else {

    window.location.href = '/login.html';
    alert("E Necessario está logado para Entrar Nessa Sessão");
};

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




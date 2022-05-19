import { users } from '../services/service.js'


const form = document.querySelector("#form__cadastro");

console.log(form.txtEmail.value);
console.log(form.txtSenha.value);

form.addEventListener('submit', (event) => {
    console.log(form.txtEmail.value);
    console.log(form.txtSenha.value);

    event.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(form.txtEmail.value, form.txtSenha.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    var uidnew= user.uid;

    let novoUsuario = {
        uid: uidnew,
        name: form.txtNome.value,
        cpf: form.txtCPF.value,
        datanascimento: form.txtDataNascimento.value,
        email: form.txtEmail.value,
        telefone: form.txtTelefone.value,
        cep: form.txtCEP.value,
        numero: form.txtNumero.value,
        complemento: form.txtComplemento.value,
        referencia: form.txtReferencia.value,
    }
    console.log(novoUsuario)
    users.add(novoUsuario).then((docRef) => {
        form.reset();
        alert(`Usuario ${novoUsuario.name} Criado com Sucesso!`)
        
    })
        .catch((error) => {
            alert(`Error ao Criar Conta!`)
            console.error("Error adding document: ", error);
        });
  })
  .catch((error) => {
    const errorCode = error.code;
     if (errorCode){
         switch(error.code){
             case 'auth/weak-password':
                 alert('Senha muito fraca.');
                 break;
            case 'auth/email-already-in-use':
                alert('Este E-mail ja está em uso por outro usuário.');
                break;
            case 'auth/wrong-password':
                alert('Senha incorreta.');
            default:
                alert('Erro desconhecido');
         }
     }
  });
});
  

   

    
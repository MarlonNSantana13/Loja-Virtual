import { users } from '../services/service.js'


const form = document.querySelector("#form__cadastro");


form.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log(form.txtEmail.value);
    console.log(form.txtNome.value);

    firebase.auth().createUserWithEmailAndPassword(form.txtEmail.value, form.txtSenha.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    var uidd = user.uid;


    console.log("Depois de criar no Auth, Nome: "+ form.txtNome.value);
    console.log("Depois de criar no Auth, Email : "+ form.txtEmail.value);
    console.log(uidd);

    users.doc(uidd).set({

        uid: uidd,
        name : form['txtNome'].value,
        cpf: form['txtCPF'].value,
        datanascimento: form['txtDataNascimento'].value,
        email: form['txtEmail'].value,
        telefone: form['txtTelefone'].value,
        cep: form['txtCEP'].value,
        numero: form['txtNumero'].value,
        complemento: form['txtComplemento'].value,
        referencia: form['txtReferencia'].value,
        
       // uid: user.uid,
       // name: form.txtNome.value,
       // cpf: form.txtCPF.value,
       // datanascimento: form.txtDataNascimento.value,
       // email: form.txtEmail.value,
       // telefone: form.txtTelefone.value,
       // cep: form.txtCEP.value,
       // numero: form.txtNumero.value,
       // complemento: form.txtComplemento.value,
       // referencia: form.txtReferencia.value,

    })
    console.log("passou");
    form.reset();
    
    alert("Conta Criada Com Sucesso");
   // alert(`Usuario ${form['txtNome'].value} Criado com Sucesso!`);
    
   // window.location.href='https://lojavirtuallm.web.app/';  
    

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
  

   
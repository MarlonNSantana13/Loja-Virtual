const db = firebase.firestore();

const accountCep = document.querySelector('.account-cep');
const accountNumero = document.querySelector('.account-numero');
const accountComplemento = document.querySelector('.account-complemento');
const accountPontodeReferencia = document.querySelector('.account-pontodereferencia');

var userid = puxaCookie("useruid");

if (userid != null) {

  // account info
  db.collection('users').doc(userid).get().then(doc => {


    //ENDEREÇO
    const htmlcep = `
    <input class="form-control" type="text" id="txtCEP" placeholder="${doc.data().cep}" autofocus />
    <label for="txtCEP">CEP</label>
    `;

    const htmlnumero = `
    <input class="form-control" type="text" id="txtCEP" placeholder="${doc.data().numero}" autofocus />
    <label for="txtCEP">Numero</label>
    `;

    const htmlcomplemento = `
    <input class="form-control" type="text" id="txtCEP" placeholder="${doc.data().complemento}" autofocus />
    <label for="txtCEP">Complemento</label>
    `;

    const htmlpontodereferencia = `
    <input class="form-control" type="text" id="txtCEP" placeholder="${doc.data().referencia}" autofocus />
    <label for="txtCEP">Ponto de Referencia</label>
    `;


    accountCep.innerHTML = htmlcep;
    accountNumero.innerHTML = htmlnumero;
    accountComplemento.innerHTML = htmlcomplemento;
    accountPontodeReferencia.innerHTML = htmlpontodereferencia;
  });

  }else{

    alert("Essa Area a Somente para Quem Esta Logado");
   
    window.location.href='/';  
  
  }



    
      

      
    
 

  
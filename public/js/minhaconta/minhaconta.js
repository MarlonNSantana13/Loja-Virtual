const db = firebase.firestore();

const accountName = document.querySelector('.account-name');
const accountCpf = document.querySelector('.account-cpf');
const accountDate = document.querySelector('.account-data');


var userid = puxaCookie("useruid");

if (userid != null) {

  // account info
  db.collection('users').doc(userid).get().then(doc => {


    //Dados PESSOAIS
    const htmlname = `
    <input class="form-control" type="text" id="txtNome" placeholder="${doc.data().name}" autofocus />
    <label for="txtNome">Nome</label>
    `;

    const htmlcpf = `
    <input class="form-control" type="text" id="txtCPF" placeholder="${doc.data().cpf}" />
    <label for="txtCPF">CPF</label>
    `;



    const htmldata = `
    <input class="form-control" type="text" id="txtDataNascimento" placeholder="${doc.data().datanascimento}" />
    <label for="txtDataNascimento">Data de Nascimento</label>
    `;
  
    accountName.innerHTML = htmlname;
    accountCpf.innerHTML = htmlcpf;
    accountDate.innerHTML = htmldata;


  });

/*
    var output =
    // [START get_all_users]
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
    // [END get_all_users]
    //console.log(output);

    */

  
    
  
  }else{

    alert("Essa Area a Somente para Quem Esta Logado");
   
    window.location.href='/';  
  
  }



    
      

      
    
 

  
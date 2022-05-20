import { contato } from '../services/service.js'

const forms = document.querySelector("#enviar__contato");

forms.addEventListener('submit', (event) => {
    const dates = new Date();

    event.preventDefault();

    let entrecontato = {
        nome: forms.txtNomeCompleto.value,
        email: forms.txtEmail.value,
        mensagem: forms.txtMensagem.value,
        date: dates,
        
    }
    console.log(entrecontato)
    contato.add(entrecontato).then((docRef) => {
       // form.reset();
        alert(`Sua Mensagem Foi Enviada Com Sucesso!\nTentaremos Responder o Mais Breve Possível!`);
        window.location.href='/';  
        
    })
        .catch((error) => {
            alert(`Error ao Enviar a Mensagem!`)
            console.error("Error adding document: ", error);
        });






});
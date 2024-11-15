// Função para transferir o e-mail
function transferirEmail(event) {
    const valor = event.target.value;
    document.querySelector("#span-endereco-email").innerHTML = valor;
}

const campoVerificacao = document.querySelector('.campo-verificacao-email');
const botao = document.querySelector('#botao-verificar');
const inputs = document.querySelectorAll('.input-codigo');
let codigoCorreto = ""; // Valor numérico de 5 dígitos para verificação

// Função para gerar um código aleatório de 5 dígitos
function gerarCodigoAleatorio() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Função para enviar o código por e-mail usando AJAX e Mailgun
function enviarEmail(codigo) {
    (function(){
        emailjs.init({
          publicKey: "zwGweWg3wEIF1Nbnc",
        });
     })();
    var paramitos = {
        sendername: document.querySelector("#input-nome").value,
        to: document.querySelector("#input-email").value,
        subject: document.querySelector("#input-email").value,
        replyto: "cidadaniaativatesteemail@gmail.com",
        message: codigo
    };

    var serviceId = "service_8mgi0f3";
    var templateId = "template_pgl2yvf";
    emailjs.send(serviceId, templateId, paramitos)
    .then(() => {
        console.log("enviado corretamente")
    })
    .catch((error) => {
        console.error('Erro ao enviar e-mail:', error);
        alert('Não foi possível enviar o e-mail. Verefique se informou o Email corretamente.');
    });
}

// Evento para gerar e enviar o código quando o e-mail é inserido

function envirCodigo(){
    if (document.querySelector("#campo-conclusao-verificacao-email").style.display != "flex"){
        codigoCorreto = gerarCodigoAleatorio();
        enviarEmail(codigoCorreto);
    }
    
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        const inputAtual = input;
        const proximoInput = input.nextElementSibling;

        if (inputAtual.value.length > 1) {
            inputAtual.value = inputAtual.value.slice(1);
        }

        if (proximoInput !== null && proximoInput.hasAttribute('disabled') && inputAtual.value !== '') {
            proximoInput.removeAttribute('disabled');
            proximoInput.focus();
        }
        if (!inputs[inputs.length - 1].disabled && inputs[inputs.length - 1].value !== ''){
            botao.classList.add('ativo');
        } else {
            botao.classList.remove('ativo');
        }
    });

    input.addEventListener('keyup', evento => {
        if (evento.key === 'Backspace') {
            if (input.previousElementSibling !== null){
                evento.target.value = '';
                evento.target.setAttribute('disabled', true);
                input.previousElementSibling.focus();
            } 
        }
    });
});

// Evento para colar o código no primeiro input
inputs[0].addEventListener('paste', (event) => {
    const pasteData = event.clipboardData.getData('text');
    if (/^\d{5}$/.test(pasteData)) {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = pasteData[i] || '';
            if (i < inputs.length - 1) {
                inputs[i + 1].removeAttribute('disabled');
            }
        }
        botao.classList.add('ativo');
    }
    event.preventDefault();
});

botao.addEventListener('click', () => {
    let codigoDigitado = '';
    inputs.forEach(input => {
        codigoDigitado += input.value;
    });

    if (codigoDigitado === codigoCorreto) {
        document.querySelector("#campo-input-verificacao-email").style.display = "none";
        document.querySelector("#campo-conclusao-verificacao-email").style.display = "flex";
    } else {
        alert('Código incorreto. Tente novamente.');
    }
});
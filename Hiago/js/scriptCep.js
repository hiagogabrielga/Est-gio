const cep = document.querySelector('#input-cep');
const cidade = document.querySelector('#input-cidade');
const bairro = document.querySelector('#input-bairro');
const rua = document.querySelector('#input-rua');
const estado = document.querySelector('#input-estado');
const message = document.querySelector('#message');

function habilitarInputsCep() {
    const inputsCep = document.querySelectorAll('#campo-dados-cep input');
    console.log(inputsCep); // Para ver se encontra os elementos

    inputsCep.forEach(input => {
        input.disabled = false;
        input.style.background = "white";
    });
}


cep.addEventListener('focusout', async () => {
    try {
        const apenasNumeros = /^[0-9]+$/;
        const cepValido = /^[0-9]{8}$/;

        if (!apenasNumeros.test(cep.value) || !cepValido.test(cep.value))
            throw { cep_error: 'Cep inválido' }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        if (!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();

        cidade.value = responseCep.localidade;
        bairro.value = responseCep.bairro;
        rua.value = responseCep.logradouro;
        estado.value = responseCep.estado;
        habilitarInputsCep()


    } catch (error) {
        if (error?.cep_error) {
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = "";

            }, 5000)
        }
        console.log(error);
    }

});
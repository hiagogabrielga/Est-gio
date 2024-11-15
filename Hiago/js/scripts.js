// Função para alternar a visibilidade da senha
function mostrarSenha(inputId, btnId) {
    const inputPass = document.getElementById(inputId);
    const btnverSenha = document.getElementById(btnId);
    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text');
        btnverSenha.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        inputPass.setAttribute('type', 'password');
        btnverSenha.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}

// Referências para os campos de senha e confirmação de senha

// Função de validação das senhas
function validarSenhas() {
    const senha = document.querySelector("#input-senha");
    const confirmacaoSenha = document.querySelector("#input-senha-de-confirmacao");

    if (senha.value !== confirmacaoSenha.value) {
        confirmacaoSenha.setCustomValidity("As Senhas são diferentes!");
        confirmacaoSenha.reportValidity();
        return false;
    } else {
        confirmacaoSenha.setCustomValidity("");
        return true;
    }
}


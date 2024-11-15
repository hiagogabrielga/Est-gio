const etapas = [
    "campo-input-dados-basicos",
    "campo-verificacao-email",
    "campo-verificacao-cep",
    "campo-adicionar-imagem"
];
let etapaAtual = 0;

function mostrarEtapa() {
    etapas.forEach((etapa, index) => {
        document.querySelector(`.${etapa}`).style.display = index === etapaAtual ? "flex" : "none";
    });
}

function atualizarBarras() {
    const barras = document.querySelectorAll(".barra");
    barras.forEach((barra, index) => {
        barra.style.backgroundColor = index <= etapaAtual ? "white" : "#ffffff7a";
    });
}

function verificarInputsPreenchidos() {
    const etapa = document.querySelector(`.${etapas[etapaAtual]}`);
    const inputs = etapa.querySelectorAll("input");

    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Por favor, preencha todos os campos antes de continuar.");
            return false;
        }
    }

    return true;
}

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


function proximaEtapa() {
    if (!verificarInputsPreenchidos()) return;

    if (etapas[etapaAtual] === "campo-verificacao-email") {
        const conclusaoVerificacao = document.querySelector("#campo-conclusao-verificacao-email");
        if (conclusaoVerificacao.style.display !== "flex") {
            alert("Você precisa concluir a verificação do e-mail antes de continuar.");
            return;
        }
    }

    if (etapas[etapaAtual] === "campo-input-dados-basicos") {
        if (!validarSenhas()) {
            return;
        }

    }

    if (etapaAtual < etapas.length - 1) {
        document.querySelector(".botao-voltar-etapa").style.display = "flex";
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 2}`;
        etapaAtual++;
        mostrarEtapa();
        atualizarBarras();
        if (etapaAtual === 1) {
            const campoVerificacao = document.querySelector(".campo-verificacao-email");
            if (window.getComputedStyle(campoVerificacao).display === "flex") {
                const inputs = campoVerificacao.querySelectorAll("input");
                if (inputs.length > 0) inputs[0].focus();
            }
        }
    } else {
        document.getElementById("formulario-cria-conta").submit();
    }
}

function voltarEtapa() {
    if (etapaAtual === 1) {
        etapaAtual = etapaAtual - 1;
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        mostrarEtapa();
        atualizarBarras();
        document.querySelector(".botao-voltar-etapa").style.display = "none";
    } else {
        etapaAtual--;
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        mostrarEtapa();
        atualizarBarras();
        if (etapaAtual == 1) {
            if (window.getComputedStyle(campoVerificacao).display === 'flex') {
                inputs[0].focus();
            }
        }
    }
}

mostrarEtapa();
atualizarBarras();

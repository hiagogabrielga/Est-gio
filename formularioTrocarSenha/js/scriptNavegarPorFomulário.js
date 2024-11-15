const etapas = [
    "campo-verificacao-email",
    "campo-trocar-senha"
];
let etapaAtual = 0;

function mostrarEtapa() {
    etapas.forEach((etapa, index) => {
        document.querySelector(`.${etapa}`).style.display = index === etapaAtual ? "flex" : "none";
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

function proximaEtapa() {
    /*if (!verificarInputsPreenchidos()) return;

    if (etapas[etapaAtual] === "campo-verificacao-email") {
        const conclusaoVerificacao = document.querySelector("#campo-conclusao-verificacao-email");
        if (conclusaoVerificacao.style.display !== "flex") {
            alert("Você precisa concluir a verificação do e-mail antes de continuar.");
            return;
        }
    }*/

    if (etapaAtual < etapas.length - 1) {
        etapaAtual++;
        mostrarEtapa();
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        document.querySelector(".botao-voltar-etapa").style.display = "flex";
    } else {
        document.getElementById("fomulario-eqSenha").submit();
    }
}

function voltarEtapa() {
    if (etapaAtual > 0) {
        etapaAtual--;
        mostrarEtapa();
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        if (etapaAtual === 0) {
            document.querySelector(".botao-voltar-etapa").style.display = "none";
        }
    }
}

mostrarEtapa();


const etapas = [
    "campo-input-dados-basicos",
    "campo-verificacao-email",
    "campo-verificacao-cep",
    "campo-adicionar-imagem"
];
let etapaAtual = 0; // Índice da etapa atual

function mostrarEtapa() {
    // Esconde todas as etapas
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

// Função para verificar se todos os inputs da etapa atual estão preenchidos
function verificarInputsPreenchidos() {
    const etapa = document.querySelector(`.${etapas[etapaAtual]}`);
    const inputs = etapa.querySelectorAll("input");

    for (let input of inputs) {
        if (input.value.trim() === "") {
            // Exibe mensagem de erro
            alert("Por favor, preencha todos os campos antes de continuar.");
            return false; // Impede a mudança para a próxima etapa
        }
    }
    return true; // Permite a mudança de etapa
}

function proximaEtapa() {
    //if (!verificarInputsPreenchidos()) return;

    if (etapaAtual < etapas.length - 1) {
        document.querySelector(".botao-voltar").style.display = "flex";
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 2}`;
        etapaAtual++;
        mostrarEtapa();
        atualizarBarras();
    } else {
        document.getElementById("formulario-cria-conta").submit(); // Envia o formulário na última etapa
    }
}

function voltarEtapa() {
    if (etapaAtual === 1) {
        etapaAtual = etapaAtual - 1;
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        mostrarEtapa();
        atualizarBarras();
        document.querySelector(".botao-voltar").style.display = "none";
    } else {
        etapaAtual--;
        document.querySelector("#numero-etapa").innerHTML = `${etapaAtual + 1}`;
        mostrarEtapa();
        atualizarBarras();
    }
}

mostrarEtapa();
atualizarBarras();

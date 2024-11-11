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

function proximaEtapa() {
    if (etapaAtual < etapas.length - 1) {
        etapaAtual++;
        mostrarEtapa();
    } else {
        document.getElementById("formulario-cria-conta").submit(); // Envia o formulário na última etapa
    }
}

// Mostra a primeira etapa ao carregar a página
mostrarEtapa();
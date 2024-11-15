var video = document.querySelector('video');
var stream;
var facingMode;

function verificarCanvas() {
    var canvas = document.querySelector('#campo-mostrar-imagem');
    var context = canvas.getContext('2d');
    if (context.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0)) {
        document.querySelector('#excluirImagem').style.display = "block";
        return true;
    } else {
        document.querySelector('#excluirImagem').style.display = "none";
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listarDispositivos();
});

function listarDispositivos() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length == 0 || videoDevices.length == 1) {
                document.querySelector("#botaotrocarCamera").style.display = "block"
            } else {
                document.querySelector("#botaotrocarCamera").style.display = "block"

            }
        })
        .catch(error => {
            console.log(error);
        });
}

function trocarCamera() {
    var canvas = document.querySelector('#campo-mostrar-imagem');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    document.querySelector('#campo-mostrar-imagem').style.display = "block";
    context.drawImage(video, 0, 0);
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    document.querySelector('video').style.display = "none";
    facingMode;
    iniciarGravacao()
    video.addEventListener('loadeddata', () => {
        document.querySelector('#campo-mostrar-imagem').style.display = "none";
        document.querySelector('video').style.display = "block";
    });
}

function iniciarGravacao() {
    if (facingMode === 'environment') {
        facingMode = 'user';
    } else if (facingMode === 'user'){
        facingMode = 'environment';
    } else {
        facingMode = 'user';
    }
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: facingMode,
            width: 300, height: 300
        }
    })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            video.style.borderRadius = '100%';
            document.querySelector('#tela-depois-de-tirar-foto').style.display = "none";
            document.querySelector("#botaoIniciar").style.display = "none";
            document.querySelector("#campoVisualizacao").style.position = "absolute";
            document.querySelector("#campoVisualizacao").style.display = "flex";
            video.addEventListener('loadeddata', () => {
                document.querySelector('video').style.display = "block";
            });
            document.querySelector('#buttonFoto').style.display = "block";
            document.querySelector('#stopButton').style.display = "block";
            document.querySelector('#logo-mobile').style.display = "none";
            document.querySelector('.botao-voltar-etapa').style.display = "none";
            document.querySelector('.botao-proximo').style.display = "none";
            document.querySelector('.etapas-descricao').style.display = "none";
        })
        .catch(error => {
            console.log(error);
            alert("Não foi possível acessar sua câmera.");
        });
}

function confirmarTirarFoto() {
    if (confirm("Você deseja continuar com o processo de tirar uma nova foto? Se fizer isso a foto tirada anteriormente será apagada.")) {
        tirarOutraFoto();
    } else {
        console.log("Processo cancelado pelo usuário.");
    }
}

function tirarOutraFoto() {
    var canvas = document.querySelector('#campo-mostrar-imagem');
    var context = canvas.getContext('2d');
    document.querySelector('#excluirImagem').style.display = "none";
    document.querySelector('#buttonFoto').style.display = "block";
    document.querySelector('#campo-mostrar-imagem').style.display = "none";
    context.clearRect(0, 0, canvas.width, canvas.height);
    var facingMode;
    if (facingMode === 'environment') {
        facingMode = 'user';
    } else if (facingMode === 'user'){
        facingMode = 'environment';
    } else {
        facingMode = 'user';
    }
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: facingMode,
            width: 300, height: 300
        }
    })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            video.style.borderRadius = '100%';
            document.querySelector('#tela-depois-de-tirar-foto').style.display = "none";
            document.querySelector("#botaoIniciar").style.display = "none";
            document.querySelector("#campoVisualizacao").style.position = "absolute";
            document.querySelector("#campoVisualizacao").style.display = "flex";
            video.addEventListener('loadeddata', () => {
                document.querySelector('video').style.display = "block";
            });
            document.querySelector('#buttonFoto').style.display = "block";
            document.querySelector('#stopButton').style.display = "block";
            document.querySelector('.botao-proximo').style.display = "none";
            document.querySelector('.etapas-descricao').style.display = "none";
            document.querySelector('.botao-voltar-etapa').style.display = "none";
            document.querySelector('.botao-voltar-etapa').style.display = "none";
        })
        .catch(error => {
            console.log(error);
            alert("Não foi possível acessar sua câmera.");
        });
}
function pararGravacao() {
    var canvasMostrarImagem = document.querySelector('#campo-mostrar-imagem');
    var canvasInicio = document.querySelector('#inicio');
    var contextMostrarImagem = canvasMostrarImagem.getContext('2d');
    var contextInicio = canvasInicio.getContext('2d');

    if (verificarCanvas()) {
        canvasInicio.width = canvasMostrarImagem.width;
        canvasInicio.height = canvasMostrarImagem.height;
        contextInicio.drawImage(canvasMostrarImagem, 0, 0);

        document.querySelector("#tela-depois-de-tirar-foto").style.display = "flex";
        document.querySelector("#botaoIniciar").style.display = "none";
    } else{
        document.querySelector("#botaoIniciar").style.display = "flex";
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    document.querySelector("#campoVisualizacao").style.display = "none";
    document.querySelector('video').style.display = "none";
    document.querySelector('#buttonFoto').style.display = "none";
    document.querySelector('#stopButton').style.display = "none";
    if (document.documentElement.scrollWidth <= 700) {
        document.querySelector('#logo-mobile').style.display = "flex";
    }
    document.querySelector('.botao-proximo').style.display = "block";
    document.querySelector('.etapas-descricao').style.display = "flex";
    document.querySelector('.botao-voltar-etapa').style.display = "flex";
}

function tirarFoto() {
    var canvas = document.querySelector('#campo-mostrar-imagem');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    document.querySelector('video').style.display = "none";
    document.querySelector('#campo-mostrar-imagem').style.display = "block";
    document.querySelector('#stopButton').style.display = "block";
    document.querySelector('#buttonFoto').style.display = "none";

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    verificarCanvas();
}

function deletarImagem() {
    document.querySelector('video').style.display = "none";
    iniciarGravacao()
    video.addEventListener('loadeddata', () => {
        document.querySelector('#campo-mostrar-imagem').style.display = "none";
        document.querySelector('video').style.display = "block";
    });
    var canvas = document.querySelector('#campo-mostrar-imagem');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector('#excluirImagem').style.display = "none";
    document.querySelector('#buttonFoto').style.display = "block";
}

function finalizarFoto() {
    if (verificarCanvas()) {
        pararGravacao();
    } else {
        alert("É obrigátorio a presença de uma imagem.");
    }
}

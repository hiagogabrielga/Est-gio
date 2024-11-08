var video = document.querySelector('video');
var stream;
var facingMode = 'user';

function verificarCanvas() {
    var canvas = document.querySelector('canvas');
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
    if (facingMode === 'environment') {
        facingMode = 'user';
    } else if (facingMode === 'user'){
        facingMode = 'environment';
    } else {
        facingMode = 'user';
    }

    console.log("valor trocado para", facingMode);
    document.getElementById('botaotrocarCamera').setAttribute('data-facing-mode', facingMode);

    return facingMode;
}

function iniciarGravacao() {
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: trocarCamera(),
            width: 300, height: 300
        }
    })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            video.style.borderRadius = '100%';
            document.querySelector("#botaoIniciar").style.display = "none";
            document.querySelector("#campoVisualizacao").style.position = "absolute";
            document.querySelector("#campoVisualizacao").style.display = "flex";
            document.querySelector('video').style.display = "block";
            document.querySelector('#buttonFoto').style.display = "block";
            document.querySelector('#stopButton').style.display = "block";
            document.querySelector('.botao-proximo').style.display = "none";
            document.querySelector('.etapas-descricao').style.display = "none";
        })
        .catch(error => {
            console.log(error);
            alert("Não foi possível acessar sua câmera.");
        });
}

function pararGravacao() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    document.querySelector("#botaoIniciar").style.display = "flex";
    document.querySelector("#campoVisualizacao").style.display = "none";
    document.querySelector('video').style.display = "none";
    document.querySelector('#buttonFoto').style.display = "none";
    document.querySelector('#stopButton').style.display = "none";
    document.querySelector('.botao-proximo').style.display = "block";
    document.querySelector('.etapas-descricao').style.display = "flex";
}

function tirarFoto() {
    var canvas = document.querySelector('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    document.querySelector('video').style.display = "none";
    document.querySelector('canvas').style.display = "block";
    document.querySelector('#stopButton').style.display = "block";
    document.querySelector('#buttonFoto').style.display = "none";

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }

    verificarCanvas();
}

function deletarImagem() {
    iniciarGravacao()
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector('#excluirImagem').style.display = "none";
    document.querySelector('video').style.display = "block";
    document.querySelector('canvas').style.display = "none";
    document.querySelector('#buttonFoto').style.display = "block";
}

function finalizarFoto() {
    if (verificarCanvas()) {
        pararGravacao();
    } else {
        alert("Não tem imagem.");
    }
}

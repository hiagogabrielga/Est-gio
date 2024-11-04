var video = document.querySelector('video');
var stream;

function verificarCanvas() {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    if (context.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0)) {
        document.querySelector('#excluirImagem').style.display = "block"
        return true
    } else {
        document.querySelector('#excluirImagem').style.display = "none"
        return false
    }
}


function iniciarGravacao() {
    verificarCanvas()
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
            stream = s;
            video.srcObject = stream;
            video.play();
            document.querySelector('#finalizar').style.display = "none"
            document.querySelector('#startButton').style.display = "none"
            document.querySelector('#buttonFoto').style.display = "block"
            document.querySelector('#stopButton').style.display = "block"
        })
        .catch(error => {
            console.log(error);
        });
};

function pararGravacao() {
    verificarCanvas()
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
    document.querySelector('#finalizar').style.display = "block"
    document.querySelector('#startButton').style.display = "block"
    document.querySelector('#stopButton').style.display = "none"
    document.querySelector('#buttonFoto').style.display = "none"

}

function tirarFoto() {

    iniciarGravacao()
    var canvas = document.querySelector('canvas');
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    verificarCanvas()
}

function deletarImagem() {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    if (verificarCanvas() == true) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('#excluirImagem').style.display = "none"
    } else {
        console.log("Não há imagem para deletar.");
    }
}

function finalizarFoto() {
    if (verificarCanvas() == true) {
        document.querySelector('#startButton').style.display = "block"
        document.querySelector('#buttonFoto').style.display = "none"
        document.querySelector('#stopButton').style.display = "none"
        document.querySelector('#excluirImagem').style.display = "none"
        document.querySelector('#finalizar').style.display = "none"
    } else {
        alert("não tem imagem");
    }
}
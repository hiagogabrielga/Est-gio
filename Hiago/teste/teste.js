document.addEventListener('DOMContentLoaded', () => {
    listarDispositivos();
});

function listarDispositivos() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length > 0) {
                let message = 'Câmeras disponíveis:\n';
                videoDevices.forEach((device, index) => {
                    message += `${index + 1}. ${device.label || `Câmera ${index + 1}`}\n`;
                });
                alert(message);
            } else {
                alert('Nenhuma câmera encontrada.');
            }
        })
        .catch(error => {
            console.log(error);
            alert("Não foi possível listar dispositivos de mídia.");
        });
}
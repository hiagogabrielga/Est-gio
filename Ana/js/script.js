function mostrarSenha(){
    const inputPass = document.getElementById('senha')
    const btnverSenha = document.getElementById('btn_senha')
    if(inputPass.type === 'password'){
        inputPass.setAttribute('type', 'text')
        btnverSenha.classList.replace('bi-eye-fill' , 'bi-eye-slash-fill')
    } else{ 
        inputPass.setAttribute('type', 'password')
        btnverSenha.classList.replace('bi-eye-slash-fill','bi-eye-fill')
    }
}
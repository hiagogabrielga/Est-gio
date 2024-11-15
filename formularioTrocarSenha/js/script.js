function mostrarSenha(inputId, btnId){
    const inputPass = document.getElementById(inputId)
    const btnverSenha = document.getElementById(btnId)
    if(inputPass.type === 'password'){
        inputPass.setAttribute('type', 'text')
        btnverSenha.classList.replace('bi-eye-fill' , 'bi-eye-slash-fill')
    } else{ 
        inputPass.setAttribute('type', 'password')
        btnverSenha.classList.replace('bi-eye-slash-fill','bi-eye-fill')
    }
}
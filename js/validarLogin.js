let email = document.getElementById('emailLogin');
let senha = document.getElementById('senhaLogin');
let form = document.querySelector('form');
let txt_email = document.getElementById('txt_email');
let txt_senha = document.getElementById('txt_senha');

form.addEventListener('submit', (s) =>{
    if(email.value == '' && senha.value == ''){
        alert('Por favor, preencha os campos de E-mail e Senha!')
    }else if (validarEmail(email.value) === true && validarSenha(senha.value) === true){
        console.log(email.value);
        console.log(senha.value);
        
    }else{
        console.log('Requisição não atendida')
        
    }
    
    s.preventDefault()
})

email.addEventListener('keyup', () => {
    if (validarEmail(email.value) !== true){
        txt_email.textContent = 'O formato do E-mail dever ser, EX: name@gmail.com'
    }else (
        txt_email.textContent = ''
    )
})

senha.addEventListener('keyup', () =>{
    if(validarSenha(senha.value) !== true){
        txt_senha.textContent = 'O formato da senha deve ser de no minimo 6 caracteres'   
    }else {
        txt_senha.textContent = ''
    }
})
function validarEmail(email){
    let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function validarSenha(senha){
    let senhaPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return senhaPattern.test(senha)
}





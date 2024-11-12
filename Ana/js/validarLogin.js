let email = document.getElementById('emailLogin');
let senha = document.getElementById('senhaLogin');
let form = document.getElementById('caixaPai');



form.addEventListener('submit', (s) =>{
    console.log(email.value);
    console.log(senha.value);
    s.preventDefault()
})









let senha = document.getElementById('senhaEsqueci');
let senhaCF = document.getElementById('cf_senha');

function validarSenhas() {
  if (senha.value != senhaCF.value) {
    senhaCF.setCustomValidity("As Senhas são diferentes!");
    senhaCF.reportValidity();
    return false;
  } else {
    senhaCF.setCustomValidity("");
    return true;
  }
}

senhaCF.addEventListener('input', validarSenhas);
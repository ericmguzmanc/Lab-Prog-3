
formulario = new Formulario();
loaderActive = false;

function submitForm() {
  prepararFormulario();

  if(formulario.esFormularioValido()) {
    generarQR();
  } else {
    errorCamposInvalidos();
  }
}

function prepararFormulario() {
  formulario.agregarValorACampo('nombreCompleto', document.getElementById('nombreCompleto').value);
  formulario.agregarValorACampo('empresaDondeLabora', document.getElementById('empresaDondeLabora').value);
  formulario.agregarValorACampo('cargo', document.getElementById('cargo').value);
  formulario.agregarValorACampo('telefonoMovil', document.getElementById('telefonoMovil').value);
  formulario.agregarValorACampo('telefonoHogar', document.getElementById('telefonoHogar').value);
  formulario.agregarValorACampo('emailInstitucional', document.getElementById('emailInstitucional').value);
  formulario.agregarValorACampo('emailEmpresa', document.getElementById('emailEmpresa').value);
}

function errorCamposInvalidos() {
  console.log('Error campos Invalidos ', formulario.obtenerCamposInvalidos());

  const error_msg = document.getElementById('error-msg');
  error_msg.innerHTML = '';
  error_msg.style.display = 'block';

  formulario.obtenerCamposInvalidos().forEach(campo => {
    const labelName = campo.campoId + 'Label';
    document.getElementById(campo.campoId).style.border = '1px solid red';
    const nombreCampo = document.getElementById(labelName).innerHTML;
    error_msg.innerHTML += 'Debe escribir su <b>' + nombreCampo + '</b> <br>';
  });

}

function limpiarValidacion(campoId) {
  document.getElementById(campoId).style.border = '1px solid lightgray';
}


function generarQR() {
  console.log(formulario);
  document.getElementById('error-msg').style.display = 'none';
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('titleSpan').innerHTML = "Codigo QR generado."
  document.getElementById('canvasContainer').style.display = 'block';

  const objCampos =  Object.fromEntries(new Map(formulario.camposToString()))

  const qr = new QRious({
    element: document.getElementById('qr-code'),
    value: JSON.stringify(objCampos),
    background: '#027368',
    backgroundAlpha: 0.8,
    foreground: '#024873',
    foregroundAlpha: 0.8,
    size: 300,
  });

}

function iniciarDetenerLoader() { 
  document.getElementById('loaderContainer').style.display = 'block';
  document.getElementById('loader').style.display = 'block';
  
  setTimeout(() => {
    document.getElementById('loaderContainer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
  }, 1500);
}

limpiarFormulario = () => formulario.limpiar();

function volverAFormulario() {
  limpiarFormulario();
  document.getElementById('error-msg').style.display = 'none';
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('titleSpan').innerHTML = "Formulario Generador de Codigo QR"
  document.getElementById('canvasContainer').style.display = 'none';
}



function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/formulario-generador-qr/", "_self");
    // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-generador-qr/index.html", "_self");
  } else {
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
    // window.open(window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self"));
  }
}

function loadPermissions() {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
  const permisos = loggedUser.permission;
  const navbarUl = document.getElementById("navbar-ul");

  permisos.forEach(elm => {

    const menuLi = document.createElement('li');
    menuLi.classList.add("nav-item")
    menuLi.id = "li-" + elm.value;

    const menuA = document.createElement("a");
    menuA.classList.add("nav-link");
    menuA.href = elm.href;
    menuA.innerHTML = elm.label;

    menuLi.appendChild(menuA);
    navbarUl.appendChild(menuLi);
  });

  document.getElementById("li-generadorQR").classList.add("active");
};

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.setItem("loggedUser", "");
  location.reload();
}
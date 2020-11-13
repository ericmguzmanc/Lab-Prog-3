
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
  iniciarDetenerLoader();
  document.getElementById('error-msg').style.display = 'none';



  // limpiarFormulario();
}

function iniciarDetenerLoader() { 
  document.getElementById('loaderContainer').style.display = 'block';
  document.getElementById('loader').style.display = 'block';
  
  setTimeout(() => {
    document.getElementById('loaderContainer').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
  }, 2000);
}

limpiarFormulario = () => formulario.limpiar();

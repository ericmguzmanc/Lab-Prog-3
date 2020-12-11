
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

function agregarFamiliar() {

  const familiar = {
    nombre: document.getElementById("nombreCompleto").value,
    parentesco: document.getElementById("parentesco").value,
    edadFamiliar: document.getElementById("edadFamiliar").value,
  }
  popularFamiliar(familiar);

  formulario.agregarFamiliar(familiar);
  console.log('formulario: ', formulario)


  document.getElementById("nombreCompleto").value = '';
  document.getElementById("parentesco").value = '';
  document.getElementById("edadFamiliar").value = '';
}

function popularFamiliar(familiar) {

  const nombre = document.createTextNode(familiar.nombre);
  const parentesco = document.createTextNode(familiar.parentesco);
  const edadFamiliar = document.createTextNode(familiar.edadFamiliar);

  let tablaFamiliares = document.getElementById("tablaFamiliares");
  let newRow = tablaFamiliares.insertRow(-1);

  // let tdNumber = newRow.insertCell(0);
  let tdNombre = newRow.insertCell(0);
  let tdParentesco = newRow.insertCell(1);
  let tdEdad = newRow.insertCell(2);

  let deleteBtn = newRow.insertCell(3);

  newRow.rowId = formulario.getArrayCount('familiares');

  tdNombre.appendChild(nombre);
  tdParentesco.appendChild(parentesco);
  tdEdad.appendChild(edadFamiliar);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.innerHTML = "<i class='fas fa-times'></i>"
  button.onclick = () => {
    deleteRow(newRow, 'familiares', newRow);
  }

  deleteBtn.appendChild(button);
  

}

function agregarCondicion() {

  const condicion = {
    enfermedad: document.getElementById("enfermedad").value,
    tiempoEnfermedad: document.getElementById("tiempoEnfermedad").value,
  }

  popularCondicion(condicion);
  formulario.agregarCondicion(condicion);
  console.log('formulario: ', formulario)

  document.getElementById("enfermedad").value = '';
  document.getElementById("tiempoEnfermedad").value = '';
}

function popularCondicion(condicion) {
  const enfermedad = document.createTextNode(condicion.enfermedad);
  const tiempo = document.createTextNode(condicion.tiempoEnfermedad);

  let tablaCondiciones = document.getElementById("tablaCondiciones");
  let newRow = tablaCondiciones.insertRow(-1);

  let tdEnfermedad = newRow.insertCell(0);
  let tdTiempo = newRow.insertCell(1);
  let deleteBtn = newRow.insertCell(2);

  newRow.rowId = formulario.getArrayCount('condiciones');

  tdEnfermedad.appendChild(enfermedad);
  tdTiempo.appendChild(tiempo);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.innerHTML = "<i class='fas fa-times'></i>"
  button.onclick = () => {
    deleteRow(newRow, 'condiciones', newRow);
  }

  deleteBtn.appendChild(button);
  

}

function agregarInternamiento() {

  const internamiento = {
    centroMedico: document.getElementById("centroMedico").value,
    diagnostico: document.getElementById("diagnostico").value,
    fechaInternamiento: document.getElementById("fechaInternamiento").value,
  }

  popularInternamiento(internamiento);

  formulario.agregarInternamiento(internamiento);
  console.log('formulario: ', formulario)

  document.getElementById("centroMedico").value = '';
  document.getElementById("diagnostico").value = '';
  document.getElementById("fechaInternamiento").value = '';
}

function popularInternamiento(internamiento) {
  const centroMedico = document.createTextNode(internamiento.centroMedico);
  const diagnostico = document.createTextNode(internamiento.diagnostico);
  const fechaInternamiento = document.createTextNode(internamiento.fechaInternamiento);

  let tablaInternamiento = document.getElementById("tablaInternamientos");
  let newRow = tablaInternamiento.insertRow(-1);

  let tdCentroMedico = newRow.insertCell(0);
  let tdDiagnostico = newRow.insertCell(1);
  let tdfechaInternamiento = newRow.insertCell(2);

  let deleteBtn = newRow.insertCell(3);

  newRow.rowId = formulario.getArrayCount('internamientos');

  tdCentroMedico.appendChild(centroMedico);
  tdDiagnostico.appendChild(diagnostico);
  tdfechaInternamiento.appendChild(fechaInternamiento);

  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-danger");
  button.innerHTML = "<i class='fas fa-times'></i>"
  button.onclick = () => {
    deleteRow(newRow, 'internamientos', newRow);
  }

  deleteBtn.appendChild(button);
  

}

function deleteRow(row, campo, rowToDelete) {
  const arrayRow = row.rowIndex > 2 ? row.rowIndex - 2 : 0;
  formulario.deleteRow(arrayRow, campo);

  rowToDelete.remove();
  console.log('form despues de borrar: ', formulario)
}

function someterFormulario() {

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const edad = document.getElementById('edad').value;

  let sex = '';
  if(document.getElementById('mRadio').value != 0) {
    sex = 'M';
  } 
  if(document.getElementById('fRadio').value != 0) {
    sex = 'F';
  }

  const email = document.getElementById('email').value;
  const nacionalidad = document.getElementById('nacionalidad').value;
  const direccion = document.getElementById('direccion').value;
  const provincia = document.getElementById('provincia').value;

  formulario.agregarValorACampo('nombre', nombre);
  formulario.agregarValorACampo('apellido', apellido);
  formulario.agregarValorACampo('edad', edad);
  formulario.agregarValorACampo('sex', sex);
  formulario.agregarValorACampo('email', email);
  formulario.agregarValorACampo('nacionalidad', nacionalidad);
  formulario.agregarValorACampo('direccion', direccion);
  formulario.agregarValorACampo('provincia', provincia);

  const formularioToSave = JSON.stringify({campos: formulario.campos, valido: formulario.valido});
  window.localStorage.setItem('formHistorialClinico', formularioToSave);
}

function fillUpForm() {
  document.getElementById('nombre').value = formulario.campos[formulario.obtenerIndiceCampo('nombre')].value;
  document.getElementById('apellido').value = formulario.campos[formulario.obtenerIndiceCampo('apellido')].value;
  document.getElementById('edad').value = formulario.campos[formulario.obtenerIndiceCampo('edad')].value;
  document.getElementById('email').value = formulario.campos[formulario.obtenerIndiceCampo('email')].value;
  document.getElementById('nacionalidad').value = formulario.campos[formulario.obtenerIndiceCampo('nacionalidad')].value;
  document.getElementById('direccion').value = formulario.campos[formulario.obtenerIndiceCampo('direccion')].value;
  document.getElementById('provincia').value = formulario.campos[formulario.obtenerIndiceCampo('provincia')].value;

  const familiares = formulario.campos[formulario.obtenerIndiceCampo('familiares')].value;
  familiares.forEach(elm => {
    popularFamiliar({ 
      nombre: elm.nombre,
      parentesco: elm.parentesco,
      edad: elm.edad
    });
  });

  const condiciones = formulario.campos[formulario.obtenerIndiceCampo('condiciones')].value;
  condiciones.forEach(elm => {
    popularCondicion({ 
      enfermedad: elm.enfermedad,
      tiempoEnfermedad: elm.tiempoEnfermedad,
    });
  });

  const internamientos = formulario.campos[formulario.obtenerIndiceCampo('internamientos')].value;
  internamientos.forEach(elm => {
    popularInternamiento({ 
      centroMedico: elm.centroMedico,
      diagnostico: elm.diagnostico,
      fechaInternamiento: elm.fechaInternamiento
    });
  });

  console.log('loadedForm ', formulario);
}

(
  function initForm() {
    if(window.localStorage.getItem('formHistorialClinico')) {
      const formData = JSON.parse(window.localStorage.getItem('formHistorialClinico'));
      formulario.campos = formData.campos;
      formulario.valido = formData.valido;
    }
  }
)()

window.addEventListener('unload', (event) => {
  console.log('Sometiendo Formulario...');
  someterFormulario();
});



function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/formulario-historial-clinico/", "_self");
    // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-historial-clinico/index.html", "_self");
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

  document.getElementById("li-historialClinico").classList.add("active");
};

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.setItem("loggedUser", "");
  location.reload();
}

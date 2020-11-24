
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


// function generarQR() {
//   // console.log(formulario);
//   // document.getElementById('error-msg').style.display = 'none';
//   // document.getElementById('formContainer').style.display = 'none';
//   // document.getElementById('titleSpan').innerHTML = "Codigo QR generado."
//   // document.getElementById('canvasContainer').style.display = 'block';

//   // const objCampos =  Object.fromEntries(new Map(formulario.camposToString()))

//   // const qr = new QRious({
//   //   element: document.getElementById('qr-code'),
//   //   value: JSON.stringify(objCampos),
//   //   background: '#027368',
//   //   backgroundAlpha: 0.8,
//   //   foreground: '#024873',
//   //   foregroundAlpha: 0.8,
//   //   size: 300,
//   // });

// }

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

  const rowNumber = document.createTextNode(formulario.getFamiliares().length > 0 ? formulario.getFamiliares().length + 1 : 1);
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

  formulario.agregarCondicion(condicion);
  console.log('formulario: ', formulario)

  document.getElementById("enfermedad").value = '';
  document.getElementById("tiempoEnfermedad").value = '';
}

function popularCondicion(condicion) {
  const rowNumber = document.createTextNode(formulario.getFamiliares().length > 0 ? formulario.getFamiliares().length + 1 : 1);
  const nombre = document.createTextNode(familiar.nombre);
  const parentesco = document.createTextNode(familiar.parentesco);
  const edadFamiliar = document.createTextNode(familiar.edadFamiliar);


  let tablaFamiliares = document.getElementById("tablaFamiliares");
  tablaFamiliares.deleteRow(1);

  let newRow = tablaFamiliares.insertRow(-1);

  let tdNumber = newRow.insertCell(0);
  let tdNombre = newRow.insertCell(1);
  let tdParentesco = newRow.insertCell(2);
  let tdEdad = newRow.insertCell(3);

  tdNumber.appendChild(rowNumber);
  tdNombre.appendChild(nombre);
  tdParentesco.appendChild(parentesco);
  tdEdad.appendChild(edadFamiliar);
}

function agregarInternamiento() {

  const familiar = {
    centroMedico: document.getElementById("centroMedico").value,
    diagnostico: document.getElementById("diagnostico").value,
    fechaInternamiento: document.getElementById("fechaInternamiento").value,
  }

  formulario.agregarInternamiento(familiar);
  console.log('formulario: ', formulario)

  document.getElementById("centroMedico").value = '';
  document.getElementById("diagnostico").value = '';
  document.getElementById("fechaInternamiento").value = '';
}

function popularInternamiento(internamiento) {
  const rowNumber = document.createTextNode(formulario.getFamiliares().length > 0 ? formulario.getFamiliares().length + 1 : 1);
  const nombre = document.createTextNode(familiar.nombre);
  const parentesco = document.createTextNode(familiar.parentesco);
  const edadFamiliar = document.createTextNode(familiar.edadFamiliar);


  let tablaFamiliares = document.getElementById("tablaFamiliares");
  tablaFamiliares.deleteRow(1);

  let newRow = tablaFamiliares.insertRow(-1);

  let tdNumber = newRow.insertCell(0);
  let tdNombre = newRow.insertCell(1);
  let tdParentesco = newRow.insertCell(2);
  let tdEdad = newRow.insertCell(3);

  tdNumber.appendChild(rowNumber);
  tdNombre.appendChild(nombre);
  tdParentesco.appendChild(parentesco);
  tdEdad.appendChild(edadFamiliar);
}

function deleteRow(row, campo, rowToDelete) {
  const arrayRow = row.rowIndex > 2 ? row.rowIndex - 2 : 0;
  formulario.deleteRow(arrayRow, campo);

  rowToDelete.remove();
  console.log('form despues de borrar: ', formulario)
}

const permisos = [
  {
    id: "cb_1",
    label: "100 Etiquetas HTML",
    value:"p-1",
    selected: false
  },
  {
    id: "cb_2",
    label: "Algoritmo Modulo 10",
    value:"p-2",
    selected: false
  },
  {
    id: "cb_3",
    label: "Formulario Generador QR",
    value:"p-3",
    selected: false
  },
  {
    id: "cb_4",
    label: "Formulario Historial Clinico",
    value:"p-4",
    selected: false
  },
  {
    id: "cb_5",
    label: " Libreria de Graficos",
    value:"p-5",
    selected: false
  },
  {
    id: "cb_6",
    label: "Menu Banreservas",
    value:"p-6",
    selected: false
  },
  {
    id: "cb_7",
    label: "Menu JSON",
    value:"p-7",
    selected: false
  },
];

function cargarPermisos() {

}

function togglePermission(event) {
  dangerAlert.style.display = "none";
  permisos.forEach(elm => {
    if (elm.id == event.id) {
      elm.selected = event.checked;
    }
  });

  console.log(permisos);
}

permissionSelected = () => permisos.some(permiso => permiso.selected);


function registrarUsuario() {
  const dangerAlert = document.getElementById("dangerAlert");
  dangerAlert.style.display = "none";

  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("passwordConfirm");
  const checkFormValidity = usuario.checkValidity() && password.checkValidity() && passwordConfirm.checkValidity() ;
  const passwordInconsistente = password.value != passwordConfirm.value;
  
  const isPermissionSelected = permissionSelected();
  
  if (passwordInconsistente) {
    dangerAlert.style.display = "block";
    dangerAlert.innerHTML = "Los password no son iguales, favor excribir passwords iguales.";
    
  } else {
    if (isPermissionSelected) {
      if (checkFormValidity) {
        
        const filteredPermissions = permisos.filter(permission => permission.selected == true);
        const userObj = {
          username: usuario.value,
          password: password.value,
          permission: filteredPermissions
        }


        window.localStorage.setItem('registeredUser', JSON.stringify(userObj));

        const successAlert = document.getElementById("successAlert");
        successAlert.style.display = "block";
        successAlert.innerHTML = "Usuario registrado con exito! <br> Redireccionando..."

        setTimeout((_ => {
          goLogin();
        }), 3000)

      }
    } else {
      dangerAlert.style.display = "block";
      dangerAlert.innerHTML = "Debe seleccionar al menos un permiso para registrarse";
      return false;
    }
  }


}



function goLogin() {
  // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
  window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self");
}


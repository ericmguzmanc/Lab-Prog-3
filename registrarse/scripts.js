
const permisos = [
  {
    id: "cb_1",
    label: "100 Etiquetas HTML",
    value:"100Etiquetas",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/"
  },
  {
    id: "cb_2",
    label: "Algoritmo Modulo 10",
    value:"algoritmoMod10",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/algoritmo-modulo-10/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/algoritmo-modulo-10/"
  },
  {
    id: "cb_3",
    label: "Formulario Generador QR",
    value:"generadorQR",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-generador-qr/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/formulario-generador-qr/"
  },
  {
    id: "cb_4",
    label: "Formulario Historial Clinico",
    value:"historialClinico",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-historial-clinico/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/formulario-historial-clinico/"
  },
  {
    id: "cb_5",
    label: " Libreria de Graficos",
    value:"libreriaGraficos",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/libreria-de-graficos/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/libreria-de-graficos/"
  },
  {
    id: "cb_6",
    label: "Menu Banreservas",
    value:"menuBanreservas",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/menu-banreservas/index.html"
    // href: "https://ericmguzmanc.github.io/Lab-Prog-3/menu-banreservas/"
  },
  {
    id: "cb_7",
    label: "Menu JSON",
    value:"menuJSON",
    selected: false,
    href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/menu-desde-json/index.html"
    // href: ""
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


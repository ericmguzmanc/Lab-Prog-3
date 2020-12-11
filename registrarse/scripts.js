var firebaseConfig = {
  apiKey: "AIzaSyAC9Z8elf_Xwi9DFQhjwaOojLrY0GC_U24",
  authDomain: "final-lab-prog-3.firebaseapp.com",
  projectId: "final-lab-prog-3",
  storageBucket: "final-lab-prog-3.appspot.com",
  messagingSenderId: "281045718516",
  appId: "1:281045718516:web:1ae1523dc9a00892e995a1",
  measurementId: "G-6FVNHDKE2X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
const usersRef = db.child('users');


const permisos = [
  {
    id: "cb_1",
    label: "100 Etiquetas HTML",
    value:"100Etiquetas",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/"
  },
  {
    id: "cb_2",
    label: "Algoritmo Modulo 10",
    value:"algoritmoMod10",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/algoritmo-modulo-10/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/algoritmo-modulo-10/"
  },
  {
    id: "cb_3",
    label: "Formulario Generador QR",
    value:"generadorQR",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-generador-qr/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/formulario-generador-qr/"
  },
  {
    id: "cb_4",
    label: "Formulario Historial Clinico",
    value:"historialClinico",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/formulario-historial-clinico/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/formulario-historial-clinico/"
  },
  {
    id: "cb_5",
    label: " Libreria de Graficos",
    value:"libreriaGraficos",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/libreria-de-graficos/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/libreria-de-graficos/"
  },
  {
    id: "cb_6",
    label: "Menu Banreservas",
    value:"menuBanreservas",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/menu-banreservas/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/menu-banreservas/"
  },
  {
    id: "cb_7",
    label: "Menu JSON",
    value:"menuJSON",
    selected: false,
    // href: "file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/menu-desde-json/index.html"
    href: "https://ericmguzmanc.github.io/Lab-Prog-3/menu-desde-json/"
  },
];





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
  const warningAlert = document.getElementById("warningAlert");
  warningAlert.style.display = "none";

  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("passwordConfirm");
  const checkFormValidity = usuario.checkValidity() && password.checkValidity() && passwordConfirm.checkValidity() ;
  const passwordInconsistente = password.value != passwordConfirm.value;
  
  const isPermissionSelected = permisos.some(permiso => permiso.selected);
  
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

        saveUser(userObj)
        .then(res => {
          // window.localStorage.setItem('registeredUser', JSON.stringify(userObj));
  
          const successAlert = document.getElementById("successAlert");
          successAlert.style.display = "block";
          successAlert.innerHTML = "Usuario registrado con exito! <br> Redireccionando..."

          goLogin();

        }).catch(error => {

          if (error.type == 'user') {
            warningAlert.style.display = "block";
            warningAlert.innerHTML = error.msg;
          } else if(error.type == error) {
            dangerAlert.style.display = "block";
            dangerAlert.innerHTML = error.msg;
          }
            return false; 
        });


      }
    } else {
      dangerAlert.style.display = "block";
      dangerAlert.innerHTML = "Debe seleccionar al menos un permiso para registrarse";
      return false;
    }
  }

}


function saveUser(usuario) {
  return new Promise((resolve, reject) => {
 
    usersRef.on("value", snapshot => {
      console.log(snapshot.val());

      if (snapshot.val()) {

        /*if(typeof snapshot.val() == 'object') {
          const userTosave = snapshot.val();
          if (userTosave.username == usuario.username && userTosave.password == usuario.password) {
            reject({"type": "user", "msg": "Este usuario ya existe, intente con otro nombre de usuario"});
          } else {
            const users = snapshot.val();
            usersRef.set({
              users,
              ...usuario
            }, res => {
              resolve("Usuario creado con exito!")
            });
          }

        } else { */
          const snapshotArray = Object.entries(snapshot.val());
          const fbUsuariosIndex = snapshotArray.findIndex(user => user[1].username == usuario.username && user[1].password == usuario.password);

    
          if (fbUsuariosIndex != -1) {
            // reject({"type": "user", "msg": "Este usuario ya existe, intente con otro nombre de usuario"});
          } else {
            usersRef.push(usuario, res => {
              const successAlert = document.getElementById("successAlert");
              successAlert.style.display = "block";
              successAlert.innerHTML = "Usuario registrado con exito! <br> Redireccionando..."

              goLogin();
            }, /*errorObject => {
              reject({"type": "error", "msg": "Problemas con la base de datos, intente nuevamente"})
            }*/);
          }
        // }

      }

    }, errorObject => {
      reject({"type":"error", "msg":"Problemas con la base de datos, intente nuevamente"});
    });
    
  });
}



function goLogin() {
  window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
  // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self");
}


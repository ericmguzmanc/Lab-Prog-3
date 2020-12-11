
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

function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {

    const loggedUserPermissions = JSON.parse(window.localStorage.getItem("loggedUser")).permission;

    if (loggedUserPermissions) {
     //window.open(loggedUserPermissions[0].href, "_self");

    } else {

      // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
      // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html", "_self");
    }
  } 
}

function logIn() {

  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");
  const dangerAlert = document.getElementById("dangerAlert");

  if (usuario.checkValidity() && password.checkValidity()) {

    doLogin(usuario.value, password.value)
    .then(res => {
      if (res) {

        window.localStorage.setItem("loggedIn", true);
        // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
        // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html", "_self");
        window.localStorage.setItem("loggedUser", JSON.stringify(res));

        const loggedUserPermissions = res.permission;
        if (loggedUserPermissions) {
          window.open(loggedUserPermissions[0].href, "_self");
        }
      }
        
        
    }).catch(error => {
      dangerAlert.style.display = "block";
      dangerAlert.innerHTML = error;
      return false;
    }); 
      
    }
    
}

function doLogin(usuario, password) {
  return new Promise((resolve, reject) => {
 
    usersRef.on("value", snapshot => {
      console.log(snapshot.val());
      const fbUsuario = snapshot.val();

      const snapshotArray = Object.entries(snapshot.val());
      if(snapshotArray.length > 0) {

        const snapshotArrayMapped = snapshotArray.map(elm => elm[1]);

        const fbUsuariosIndex = snapshotArray.findIndex(user => user[1].username == usuario && user[1].password == password);
        if (fbUsuariosIndex != -1) {
          resolve(snapshotArray[fbUsuariosIndex][1]);
        } else {
          reject("Este usuario no existe, intente de nuevo o registrese");
        }
      } else {
        if (fbUsuario && fbUsuario.username == usuario && fbUsuario.password == password) {
          resolve(fbUsuario);
        }
        else {
          reject("Este usuario no existe, intente de nuevo o registrese");
        }
      }

    }, errorObject => {
      reject("Problemas con la base de datos, intente nuevamente");
    });
    
  });
}

function openRegisterPage() {
  window.open("https://ericmguzmanc.github.io/Lab-Prog-3/registrarse/", "_self");
  // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/registrarse/index.html", "_self");

}

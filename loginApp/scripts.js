
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
    // setTimeout(() => {
    //   const users = JSON.parse(window.localStorage.getItem("registeredUser"));
    //   if (users) {
    //     if(users.username == usuario && users.password == password) {
    //       resolve(users);
    //     } {
    //       reject("No existe este usuario");
    //     }
    //   } else {
    //     reject("No existe este usuario.");
    //   }
    // },1000);

    // usersRef.on("child_added", snap => {
    //   let user = snap.val();
    //   if (user.username == usuario && user.password == password) {
    //     resolve(user);
    //   }
    // });

    usersRef.on("value", snapshot => {
      console.log(snapshot.val());
      const fbUsuario = snapshot.val();
      const fbUsuariosIndex = snapshot.val().findIndex(user => user.username == usuario && user.password == password);

      if (fbUsuariosIndex != -1) {
        resolve(fbUsuario[fbUsuariosIndex]);
      } else {
        reject("Este usuario no existe, intente de nuevo o registrese");
      }

    }, errorObject => {
      reject("Problemas con la base de datos, intente nuevamente");
    });
    
  });
}

function openRegisterPage() {
  // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/registrarse/", "_self");
  window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/registrarse/index.html", "_self");

}


{/* <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  firebase.analytics();
</script> */}
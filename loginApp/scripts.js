
function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {

    const loggedUserPermissions = JSON.parse(window.localStorage.getItem("registeredUser")).permission;

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
      window.localStorage.setItem("loggedIn", true);
      // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
      // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html", "_self");
      
      const loggedUserPermissions = JSON.parse(window.localStorage.getItem("registeredUser")).permission;
      if (loggedUserPermissions) {
       window.open(loggedUserPermissions[0].href, "_self");
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
    setTimeout(() => {
      const users = JSON.parse(window.localStorage.getItem("registeredUser"));


      if (users) {
        if(users.username == usuario && users.password == password) {
          resolve(users);
        } {
          reject("No existe este usuario");
        }
      } else {
        reject("No existe este usuario.");
      }

      
    },1000);
  });
}

function openRegisterPage() {
  // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/registrarse/", "_self");
  window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/registrarse/index.html", "_self");

}

function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
    window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html", "_self");
  } 
}

function logIn() {
  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");

  if (usuario.checkValidity() && password.checkValidity()) {
    window.localStorage.setItem("loggedIn", true);
    window.localStorage.setItem("loggedInUser", JSON.stringify({"usuario": usuario, "password": password}));
  
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
    // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/100-etiquetas-html/index.html", "_self");
    location.reload();
  }



}

function openRegisterPage() {
  // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/registrarse/", "_self");
  window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/registrarse/index.html", "_self");

}
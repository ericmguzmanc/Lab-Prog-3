
function checkIfLoggedIn() {
  const loggedIn = window.localStorage.getItem("loggedIn");
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
  } else {
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
  }
}

function logIn() {

  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("usuario").value;

  window.localStorage.setItem("loggedIn", true);
  window.localStorage.setItem("loggedInUser", JSON.stringify({"usuario": usuario, "password": password}));



}
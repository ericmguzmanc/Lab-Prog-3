function checkIfLoggedIn() {
  const loggedIn = window.localStorage.getItem("loggedIn");
  if (loggedIn) {
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
  } else {
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
  }
}

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
}
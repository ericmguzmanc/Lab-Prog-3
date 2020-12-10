

function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/menu-banreservas/", "_self");
    // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/menu-banreservas/index.html", "_self");
  } else {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
    window.open(window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self"));
  }
}

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  location.reload();
}
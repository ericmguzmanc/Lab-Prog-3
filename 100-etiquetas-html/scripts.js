function loadPermissions() {
  const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
  const permisos = loggedUser.permission;
  const navbarUl = document.getElementById("navbar-ul");

  permisos.forEach(elm => {

    const menuLi = document.createElement('li');
    menuLi.classList.add("nav-item")
    menuLi.id = "li-" + elm.value;

    const menuA = document.createElement("a");
    menuA.classList.add("nav-link");
    menuA.href = elm.href;
    menuA.innerHTML = elm.label;

    menuLi.appendChild(menuA);
    navbarUl.appendChild(menuLi);
  });

  document.getElementById("li-100Etiquetas").classList.add("active");
};


function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    //window.open("https://ericmguzmanc.github.io/Lab-Prog-3/100-etiquetas-html/", "_self");
  } else {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
    window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self");
  }
}

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.setItem("loggedUser", "");
  location.reload();
}
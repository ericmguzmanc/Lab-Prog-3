
function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
}
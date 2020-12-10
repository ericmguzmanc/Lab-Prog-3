function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    //window.open("https://ericmguzmanc.github.io/Lab-Prog-3/algoritmo-modulo-10/", "_self");
  } else {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
    window.open(window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self"));
  }
}

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

  document.getElementById("li-algoritmoMod10").classList.add("active");
};


// function iniciarValidacion() {

//   const valorCedula = document.getElementById('ced-valor').value;
//   const error = document.getElementById('error-msg');
//   const cedulaResultado = document.getElementById('ced-result');
  
//   if (isNaN(valorCedula)) {
//     error.innerHTML = 'Cedula no es valida';
//     error.style.display = 'block';
//     error.style.backgroundColor = '#ffc2c3';
//     error.style.padding = '10px';
//     cedulaResultado.style.display = 'none'
//     return false;
//   }

//   else if(valorCedula.length<=9){
//     error.innerHTML = 'Faltan numeros, por favor vereifique y vuelva a escribir';
//     error.style.display = 'block';
//     error.style.backgroundColor = '#ffc2c3';
//     error.style.padding = '10px';
//     cedulaResultado.style.display = 'none'
//     return false;
//   }
  
//   else{
//     let add1 = 0;
//     let total = 0;
//     let res = [];
//     let pos = 2;
//     res = Array.from(valorCedula);
              
//     error.style.display = 'none';
//     let elemento=0;
    
//     for (let i = 0; i < res.length; i++) {
//       if (pos==1) {
//         pos=2;
//       }
//       else if(pos==2){
//           pos=1;
//       }
      
//       elemento = res[i]*pos;
                
//       if((elemento/2)>=5){
//         let primerDigito = '';
//         let segundoDigito = '';
    
//         primerDigito = elemento.toString().charAt(0);
//         segundoDigito = elemento.toString().charAt(1);
//         add1 = parseInt(segundoDigito) + parseInt(primerDigito);
//       } else{
//         add1 = parseInt(elemento);
//       }
        
//       total = total + add1;
//       let modulo = total % 10;
//       var lastNumber = 10 - modulo;
//     }
      
//     const lastMessageText = 'Su cedula es: ';
//     let lastMessageCed = valorCedula.substring(0, 3) + '-' + valorCedula.substring(4, lastNumber.length) + '-' + lastNumber;

//     cedulaResultado.style.display = 'block';
//     cedulaResultado.style.padding = '10px';
//     cedulaResultado.style.background = '#beffc4';
//     cedulaResultado.style.fontWeight = '#bold';
//     cedulaResultado.innerHTML = lastMessageText + lastMessageCed;

//     return false;
//   }       
    
// }
async function iniciarValidacion() {

  const valorCedula = document.getElementById('ced-valor').value;
  const error = document.getElementById('error-msg');
  const cedulaResultado = document.getElementById('ced-result');
  
  if (isNaN(valorCedula)) {
    error.innerHTML = 'Cedula no es valida';
    error.style.display = 'block';
    error.style.backgroundColor = '#ffc2c3';
    error.style.padding = '10px';
    cedulaResultado.style.display = 'none'
    return false;
  }

  else if(valorCedula.length<=9){
    error.innerHTML = 'Faltan numeros, por favor vereifique y vuelva a escribir';
    error.style.display = 'block';
    error.style.backgroundColor = '#ffc2c3';
    error.style.padding = '10px';
    cedulaResultado.style.display = 'none'
    return false;
  }
  
  else{

    servicioModulo10 = new modulo10Service();     
    const lastNumber = await servicioModulo10.validarModulo10(error, valorCedula);
      
    const lastMessageText = 'Su cedula es: ';
    let lastMessageCed = valorCedula.substring(0, 3) + '-' + valorCedula.substring(4, lastNumber.length) + '-' + lastNumber;

    cedulaResultado.style.display = 'block';
    cedulaResultado.style.padding = '10px';
    cedulaResultado.style.background = '#beffc4';
    cedulaResultado.style.fontWeight = '#bold';
    cedulaResultado.innerHTML = lastMessageText + lastMessageCed;

    return false;
  }       
    
}


function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.setItem("loggedUser", "");
  location.reload();
}
  
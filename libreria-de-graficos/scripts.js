var myChart;


function prepareData() {
  fillDropdown();

  var ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# Cantidad de Casos',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 51, 153, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stacked: true
                }
            }]
        }
    }
  });
  
  changeProvince("Distrito Nacional");
}

function fillDropdown() {
  let selectProvincia = document.getElementById("selectProvincia");
  dataONE.forEach((elm, index) => {
    let option = document.createElement("option");
    option.value = elm.provincia;
    option.innerHTML = elm.provincia;

    selectProvincia.appendChild(option);

    if (elm.provincia == "Distrito Nacional") {
      selectProvincia.selectedIndex = index + 1;
    }
  });
}


function changeProvince(value) {
  console.log('Selected Province: ', value);
  const provinceIndex = dataONE.findIndex(elm => elm.provincia == value);

  const formattedData = dataONE[provinceIndex].data.map(keys => {
    return {
      years: Object.keys(keys).map(elm => elm),
      casos: Object.keys(keys).map(elm=> keys[elm])
    }
  })

  initChart(formattedData[0]);
}

function initChart(provincia) {

  provincia.years.forEach(_ => removeData(myChart));
  provincia.years.forEach((elm, index) => {
    addData(myChart, provincia.years[index], provincia.casos[index])
  });

}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}



function checkIfLoggedIn() {
  const loggedIn = JSON.parse(window.localStorage.getItem("loggedIn"));
  if (loggedIn) {
    // window.open("https://ericmguzmanc.github.io/Lab-Prog-3/libreria-de-graficos/", "_self");
    // window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/libreria-de-graficos/index.html", "_self");
  } else {
    window.open("https://ericmguzmanc.github.io/Lab-Prog-3/loginApp/", "_self");
    // window.open(window.open("file:///C:/Users/ericm/OneDrive/Documents/UASD/Lab.%20Programaci%C3%B3n%20III/Tareas/loginApp/index.html", "_self"));
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

   document.getElementById("li-libreriaGraficos").classList.add("active");
};

function logOut() {
  window.localStorage.setItem("loggedIn", false);
  window.localStorage.setItem("loggedUser", "");
  location.reload();
}

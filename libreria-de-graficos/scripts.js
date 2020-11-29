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

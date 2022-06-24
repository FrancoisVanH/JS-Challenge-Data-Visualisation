// creation du graph API
let createCanvasApi = document.querySelector("#firstHeading");
let canvasApi = document.createElement("canvas");
 createCanvasApi.appendChild(canvasApi) ;
 canvasApi.setAttribute("id", "myChartApi");

// creation du graph 1
let createCanvasOne = document.querySelector("h3");
let firstCanvas = document.createElement("canvas");
 createCanvasOne.appendChild(firstCanvas) ;
 firstCanvas.setAttribute("id", "myChart1");


// creation du graph 2
let createCanvasTwo = document.querySelector("#Homicides");
let secondCanvas = document.createElement("canvas");
 createCanvasTwo.appendChild(secondCanvas) ;
 secondCanvas.setAttribute("id", "myChart2");

let myChart = null;
let myChart2 = null;

//#################################################### API graph 

var config = {
  type: 'line',
  data: {
      labels: [],
      datasets: [
          {
            label: "Data",
            data: [],
            backgroundColor : "black",
            borderColor : "blue",
          }
      ]                 
  },
  options: {
      responsive: true,
      plugins: {
          legend: {
          display: false,
          },
      },  
      scales: {
        y: {
            suggestedMin: -10,
            suggestedMax: 30,
            }
      }
  },
  
};

const myChart3= new Chart(document.getElementById('myChartApi'), config);

function addData(chart,label, data) {
for (let z = 0; z < label.length; z++ ){ 
  chart.data.labels.push(label[z]);
}
for (let z = 0; z < data.length; z++){  
      chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data[z]);
  });
}
  chart.update();
};

var inter = setInterval(fetchF, 5500);
var label3 = [];


function fetchF(){

fetch("https://canvasjs.com/services/data/datapoints.php", {cache: "reload"})
.then(response=> response.json())
.then(datapoints => {

  for(x=0; x<datapoints.length; x++){
      label3[x] = datapoints[x][0];
  };
 
  addData(myChart3, label3, datapoints);

});

};

//#################################################### first graph

// recupération des data
let myDataPLZ = document.getElementById('table1')
const arr = [...myDataPLZ.rows].map(r => [...r.querySelectorAll('td')].map(td => td.textContent))

// incrémentation arr[]
 var button = document.getElementById("myButton"),
 count = 1;
 var buttonAll = document.getElementById("myButtonAll");

let label1 = arr[count].slice(0,1);
let data1 = arr[count].slice(1).map(parseFloat)

button.onclick = function() {
  count += 1;
  if(count == 36) {
   count = 2;
 } 
 var countMinus1 = count - 1
  button.innerHTML = "Country n°"+ countMinus1 ;
 
  let data1 = arr[count].slice(1).map(parseFloat)

 let label1 = arr[count].slice(0,1);
 // incrémentation arr[]
const labels = [
  '02', '03','04','05','06','07','08','09','10','11','12'
  ]
  var data = {
    labels: labels,
    datasets: [{
      label: label1,
      data : data1,
      fill : false,
      borderColor: 'rgb(71, 131, 235)',
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
      tension: 0.1
    }]
  }

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        }
      }
    }
  };
  
   
  if (myChart!=null) {
    myChart.destroy()
  }

   myChart = new Chart(
    document.getElementById('myChart1'),
    config
  );
 }; // end of btn.onclick
//#################################################### ALL graph SO to Arnold

buttonAll.onclick = function() {
      //config
      // labels
      const allLabels = [];
      for(i=2; i < document.getElementsByTagName("tr")[1].getElementsByTagName("th").length; i++ ){
         allLabels.push(document.getElementsByTagName("tr")[1].getElementsByTagName("th")[i].textContent)
      }

      // data
     var allCountries = []; // Liste des noms de pays
     var allDataCountries = []; // Data de chaque pays
     var getThoseData = [];

     for(i = 2; i < document.getElementById("table1").getElementsByTagName("tr").length; i++ ){

        let x = i-2;
        allCountries[x]= [];
        allDataCountries[x] = [];
        getThoseData[x]=[];
         for(j = 0; j < document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td").length; j++){
             if(j == 0) {
                // Nom des pays
               allCountries[x].push(document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent.replace(/[^a-zA-Z ]/g, ""));
             }
             else {
                // Data des dpays
               allDataCountries[x].push(parseFloat(document.getElementById("table1").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent.replace(",",".")));
             } 
             // Index avec toutes les infos pour graph.
             getThoseData[x] = {label: allCountries[x], data: allDataCountries[x], fill: false, borderColor: getRandomColor(),tension: 0.1};  
         }
     }
          // Générateur de couleurs pour graph.

          function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
            }
       
            
         // GRAPH - SET-UP
         const data = {
            labels: allLabels,
            datasets: getThoseData
         };
          
         const config = {
             type: 'line',
             data: data,
            };
      
        const myChartAll = new Chart(
          document.getElementById('myChartAll'),
          config
        );
}// end of onclick

//#################################################### ALL graph 

//#################################################### second graph

let getSecondData = document.getElementById('table2')
const arr2 = [...getSecondData.rows].map(r => [...r.querySelectorAll('td')].map(td => td.textContent))

var button2 = document.getElementById("myButton2"),
count2 = 0;

let label2 = arr2[count2].slice(0,1);

let data2 = arr2[count2].slice(1).map(parseFloat)

button2.onclick = function() {
  count2 += 1;
  if(count2 == 30) {
   count2 = 1;
 }  
 var countPlus3 = count2 + 3
 button2.innerHTML = "Country n°"+ countPlus3;


let label2 = arr2[count2].slice(0,1);

let data2 = arr2[count2].slice(1).map(parseFloat)

let labels = ['07-09','10-12']
const data = {
  labels: labels,
  datasets: [{
    label: label2,
    data: data2,
    backgroundColor: [
      'rgba(170, 155, 252, 0.4)',
      'rgba(128, 106, 251, 0.5)'
    ],
    borderColor: [
      'rgb(128, 106, 251)',
      'rgb(170, 155, 252)'
    ],
    borderWidth: 1
  }]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

if (myChart2!=null) {
  myChart2.destroy()
}

myChart2 = new Chart(
  document.getElementById('myChart2'),
  config
);
}; // end of btn.onclick

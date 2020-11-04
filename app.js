APIKey = "e3cdabf7296ad5ad27b92f8faad0a9a8"
var cityName;
var cityName1;

$("form").on("submit",function(e) 
{e.preventDefault();
    cityName = e.target.querySelector("input").value;
    cityName1 = JSON.stringify(cityName);
//  console.log("city to be searched" + JSON.stringify(citytobeSearched2));
//  var citytobeSearched2 = e.target.querySelector("input").value; 
 console.log(cityName1); 

 console.log("outside"  + cityName1);

let list = document.querySelector("#searchedCities");

let element = document.createElement("tr");
let element1 = document.createElement("td");

element1.textContent = cityName;
element.append(element1);
searchedCities.prepend(element);


 var key = "e3cdabf7296ad5ad27b92f8faad0a9a8";


  var URL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
  var URL = `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=e3cdabf7296ad5ad27b92f8faad0a9a8`

 

   var URL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + " + &units=imperial&appid=e3cdabf7296ad5ad27b92f8faad0a9a8"

fetch(URL, {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  // cache: 'reload',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("inside fetch: " + data);
    var dataS = JSON.stringify(data);
    console.log("inside fetch string: " + dataS);
    display(data);
  });

  function display(items){
    console.log(items);
    console.log("data.name is" + items.name);

    let columnLeft = document.querySelector(".col-8");
let headingElement = document.createElement("h3");
//let element1 = document.createElement("td");
headingElement.textContent = items.name +  "  " ;
columnLeft.append(headingElement);
//searchedCities.prepend(element);
let headingElement1 = document.createElement("p");
//let element1 = document.createElement("td");
let mainO = items.main;
console.log("items.main" + items);
headingElement1.textContent = "Temperature: "+ items.main.temp;
columnLeft.append(headingElement1);

let cloudsElement = document.createElement("p");
cloudsElement.textContent = "clouds: "+ items.weather[0].description;
columnLeft.append(cloudsElement);


// let cloudsIcon = document.createElement("p");
// cloudsIcon1 = items.weather[0].icon;
// location.assign("http://openweathermap.org/img/wn/cloudsIcon1");
// // var URLIcon = 
// cloudsIcon.textContent = "clouds: "+ URLIcon;
// columnLeft.append(cloudsIcon);


let headingElement2 = document.createElement("p");
headingElement2.textContent = "Humidity: "+ items.main.humidity;
columnLeft.append(headingElement2);

let headingElement3 = document.createElement("p");
headingElement3.textContent = "Humidity: "+ items.wind.speed;
columnLeft.append(headingElement3);
// columnLeft.clientLeft.append();
  }



  // var URL1 = "api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=5&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
  // fetch(URL1, {
  //   // The browser fetches the resource from the remote server without first looking in the cache.
  //   // The browser will then update the cache with the downloaded resource.
  //   // cache: 'reload',
  // })
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log("inside fetch: " + data.main);
  //   });

  //   displayFiveDay(data);

  //   function displayFiveDay(data){
  //     console.log("5 day forecast: " + data);
  //   }
});



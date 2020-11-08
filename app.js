APIKey = "e3cdabf7296ad5ad27b92f8faad0a9a8";
var cityName;
var cityName1;
let Lat;
let Lon;
var part = ["minutely", "hourly", "alerts"];
let list1 = document.querySelector("#zero");
let uviSet = false;
//console.log("list1: ");
//console.log(list1);

$("form").on("submit", function (e) 
{
  e.preventDefault();
  cityName = e.target.querySelector("input").value;
  cityName1 = JSON.stringify(cityName);
  //  //console.log("city to be searched" + JSON.stringify(citytobeSearched2));
  //  var citytobeSearched2 = e.target.querySelector("input").value;
  //console.log(cityName1);

  //console.log("outside" + cityName1);

  let list = document.querySelector("#searchedCities");
  
  let element = document.createElement("tr");
  let element1 = document.createElement("td");
  // let element2 = document.createElement("button");

   let myButton = "<form id = 'myForm'><input type=submit value="+cityName1+" style='width:100%'></form>";
   console.log("Creating my butotns!!!!!!");
  element1.innerHTML = myButton;
  element1.setAttribute("id", cityName1);
  element.append(element1);
  list.prepend(element);

  var key = "e3cdabf7296ad5ad27b92f8faad0a9a8";

  // var URL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
  // var URL = `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=e3cdabf7296ad5ad27b92f8faad0a9a8`
  var URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    " + &units=imperial&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";

  fetch(URL, {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    // cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log("inside fetch: " + data);
      var dataS = JSON.stringify(data);
      console.log("inside fetch string: ");
      console.log(dataS);
      getCoordinates(data);
      display(data);

      // TODO: move code here
    }).then(() => {
      var URL1 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      Lat +
      "&lon=" +
      Lon +
      "&units=" + "imperial"+
      "&exclude=" +
      part +
      "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
      console.log("new URL1:", URL1);
      console.log("new lat*: " + Lat);
      console.log(" new lon*: " + Lon);
  
    fetch(URL1, {
      // The browser fetches the resource from the remote server without first looking in the cache.
      // The browser will then update the cache with the downloaded resource.
      // cache: 'reload',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("inside fetch of URL1: ");
        console.log(data);
        displayFiveDay(data);
      });
    });


  $("#myForm").on("submit", function (e) 
{
  e.preventDefault();
  cityName = e.target.querySelector("input").value;
  cityName1 = JSON.stringify(cityName);
  //  //console.log("city to be searched" + JSON.stringify(citytobeSearched2));
  //  var citytobeSearched2 = e.target.querySelector("input").value;
  //console.log(cityName1);

  //console.log("outside" + cityName1);

  let list = document.querySelector("#searchedCities");
  
  // let element = document.createElement("tr");
  // let element1 = document.createElement("td");
  // // let element2 = document.createElement("button");
  //  console.log("!!!!!!!creating button!!!!!!!");
  //  let myButton = "<form><input type=submit value="+cityName1+" style='width:100%'></form>";

  // element1.innerHTML = myButton;
  // element.append(element1);
  //  list.prepend(element);

  var key = "e3cdabf7296ad5ad27b92f8faad0a9a8";

  // var URL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
  // var URL = `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=e3cdabf7296ad5ad27b92f8faad0a9a8`
  var URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    " + &units=imperial&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";

  fetch(URL, {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    // cache: 'reload',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log("inside fetch: " + data);
      var dataS = JSON.stringify(data);
      console.log("inside fetch string: ");
      console.log(dataS);
      getCoordinates(data);
      display(data);

      // TODO: move code here
    }).then(() => {
      var URL1 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      Lat +
      "&lon=" +
      Lon +
      "&units=" + "imperial"+
      "&exclude=" +
      part +
      "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
      console.log("new URL1:", URL1);
      console.log("new lat*: " + Lat);
      console.log(" new lon*: " + Lon);
   
  
    fetch(URL1, {
      // The browser fetches the resource from the remote server without first looking in the cache.
      // The browser will then update the cache with the downloaded resource.
      // cache: 'reload',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("inside fetch of URL1: ");
        console.log(data);
        displayFiveDay(data);
      });
    });
  });


  function getCoordinates(items, cb){
    Lat = items.coord.lat;
    Lon = items.coord.lon;
    var URL2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    Lat +
    "&lon=" +
    Lon +
    "&units=" + "imperial"+
    "&exclude=" +
    part +
    "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
    console.log("URL2:", URL2);
  }
  function display(items) {
    //console.log(items);
    // let dateNow = moment.format('MMM Do YY');
    // //console.log("data.name is" + items.name + dateNow);

    let List1 = document.querySelector(".col-sm-8");
    List1.innerHTML= "";
    let headingElement = document.createElement("h3");
    // headingElement.setAttribute("position", "30px");
    // headingElement.setAttribute("border", "3px solid #73AD21");

    Lat = items.coord.lat;
    Lon = items.coord.lon;

    //console.log("lat: " + Lat);
    //console.log("lon: " + Lon);

    // position: relative;
    //   left: 30px;
    //   border: 3px solid #73AD21;

    //let element1 = document.createElement("td");
    let cloudsIcon = document.createElement("img");
    let clouds = items.weather[0].icon;

    cloudsIcon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + clouds + ".png"
    );
    headingElement.textContent = items.name + "  ";
    List1.append(headingElement);
    List1.append(cloudsIcon);

    // var URLIcon =

    // List1.append(cloudsIcon);
    //searchedCities.prepend(element);
    let headingElement1 = document.createElement("p");
    //let element1 = document.createElement("td");
    //console.log("items.main" + items);
    headingElement1.textContent =
      "Temperature: " + items.main.temp + "\u00B0 F";
    List1.append(headingElement1);
    // let cloudsElement = document.createElement("p");
    // cloudsElement.textContent = "clouds: "+ items.weather[0].description;
    // List1.append(cloudsElement);
    let headingElement2 = document.createElement("p");
    headingElement2.textContent = "Humidity: " + items.main.humidity + "%";
    List1.append(headingElement2);

    let headingElement3 = document.createElement("p");
    headingElement3.textContent = "Wind Speed: " + items.wind.speed + " MPH";
    List1.append(headingElement3);
    // List1.clientLeft.append();
  }

 

  // One call API
  // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

  // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}

  
  // var URL1 =
  //   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  //   Lat +
  //   "&lon=" +
  //   Lon +
  //   "&units=" + "imperial"+
  //   "&exclude=" +
  //   part +
  //   "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
  // console.log("URL1:", URL1);
  // console.log("lat*: " + Lat);
  // console.log("lon*: " + Lon);

  // fetch(URL1, {
  //   // The browser fetches the resource from the remote server without first looking in the cache.
  //   // The browser will then update the cache with the downloaded resource.
  //   // cache: 'reload',
  // })
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log("inside fetch of URL1: ");
  //     console.log(data);
  //     displayFiveDay(data);
  //   });
  function displayFiveDay(data) {
    let List11 = document.querySelector(".col-sm-8");
     uviSet = false;

    let uvi = data.current.uvi;
    let headingElement3 = document.createElement("p");
   
    
    headingElement3.innerHTML = "UV Index: " + "<span class = 'block'>" +  uvi  + "</span>";
    List11.append(headingElement3);
   

    console.log("5 day forecast: ");
    console.log(data);
    let columns = ["#zero", "#one", "#two", "#three", "#four"];

    
console.log("list1 end: ");
console.log(list1);

let heading2= document.querySelector("#fiveDayHeading");
heading2.textContent= "5-day Forecast:";
    for (var i = 0; i <5; i++){
      let myColumn = columns[i];
      let list3 = document.querySelector(myColumn);
      list3.innerHTML = "";
      list3.setAttribute("background-color", "blue");
      console.log("list1 end :" + list1);
      
      
      let cloudsIcon = document.createElement("img");
    let clouds = data.daily[i].weather[0].icon;
    // let headingElement = document.createElement("p");
    ////console.log("Clouds Icon at End: " + clouds);

    cloudsIcon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + clouds + ".png"
    );
    // headingElement.textContent = data.name + "  ";
    // list3.append(headingElement);
    list3.append(cloudsIcon);
    let daily = data.daily[i].humidity;
    let temp = data.daily[i].temp.day;
   //console.log("Daily is: ");
   let additionalData = document.createElement("p");
   additionalData.innerHTML= "Temp: " + temp +  "\xB0F"+  "<br>" + "Humidity: " +daily + "%"+  "<br>"  +  "<br>";
  list3.append(additionalData);
   
  console.log(daily);
}  
  }

  // $("td")."click", citySearch(e) );

})

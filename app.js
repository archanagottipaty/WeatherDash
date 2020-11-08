APIKey = "e3cdabf7296ad5ad27b92f8faad0a9a8";
var cityName; //User entered city name
var cityName1; //User entered city name after using Stringify()
let Lat; //coordinates of cityName
let Lon; //coordinates of cityName
var part = ["minutely", "hourly", "alerts"]; // passed to URL1

// Event handler which handles the search of a cityName
$("form").on("submit", function (e) {
  e.preventDefault();
  cityName = e.target.querySelector("input").value;
  //Using stringify so that cityName can be used later
  cityName1 = JSON.stringify(cityName);
  let list = document.querySelector("#searchedCities");
  let element = document.createElement("tr");
  let element1 = document.createElement("td");

  //Adding a button on the fly with the cityName
  let myButton =
    "<form id = 'myForm'><input type=submit value=" +
    cityName1 +
    " style='width:100%'></form>";
  element1.innerHTML = myButton;
  element1.setAttribute("id", cityName1);
  element.append(element1);
  list.prepend(element);

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
      var dataS = JSON.stringify(data);
      console.log("inside fetch string: ");
      console.log(dataS);
      getCoordinates(data);
      display(data);

      // TODO: move code here
    })
    .then(() => {
      var URL1 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        Lat +
        "&lon=" +
        Lon +
        "&units=" +
        "imperial" +
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
  //Event handler which handles the click on the history
  // This copy is very similar to the earlier event handler
  $("#myForm").on("submit", function (e) {
    e.preventDefault();
    cityName = e.target.querySelector("input").value;
    cityName1 = JSON.stringify(cityName);

    let list = document.querySelector("#searchedCities");

    var key = "e3cdabf7296ad5ad27b92f8faad0a9a8";
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
        var dataS = JSON.stringify(data);
        console.log("inside fetch string: ");
        console.log(dataS);
        getCoordinates(data);
        display(data);

        // TODO: move code here
      })
      .then(() => {
        var URL1 =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          Lat +
          "&lon=" +
          Lon +
          "&units=" +
          "imperial" +
          "&exclude=" +
          part +
          "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
       
        fetch(URL1, {
          // The browser fetches the resource from the remote server without first looking in the cache.
          // The browser will then update the cache with the downloaded resource.
          // cache: 'reload',
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {

            displayFiveDay(data);
          });
      });
  });
 // Performs 3 functions: setting Lat and Lon and URL2
  function getCoordinates(items, cb) {
    Lat = items.coord.lat;
    Lon = items.coord.lon;
    var URL2 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      Lat +
      "&lon=" +
      Lon +
      "&units=" +
      "imperial" +
      "&exclude=" +
      part +
      "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8";
    console.log("URL2:", URL2);
  }
  //Displays the first half of the display data
  function display(items) {
    let List1 = document.querySelector(".col-sm-8");
    List1.innerHTML = "";
    let headingElement = document.createElement("h3");

    Lat = items.coord.lat;
    Lon = items.coord.lon;

    let cloudsIcon = document.createElement("img");
    let clouds = items.weather[0].icon;

    cloudsIcon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + clouds + ".png"
    );
    headingElement.textContent = items.name + "  ";
    List1.append(headingElement);
    List1.append(cloudsIcon);

    let headingElement1 = document.createElement("p");

    headingElement1.textContent =
      "Temperature: " + items.main.temp + "\u00B0 F";
    List1.append(headingElement1);

    let headingElement2 = document.createElement("p");
    headingElement2.textContent = "Humidity: " + items.main.humidity + "%";
    List1.append(headingElement2);

    let headingElement3 = document.createElement("p");
    headingElement3.textContent = "Wind Speed: " + items.wind.speed + " MPH";
    List1.append(headingElement3);
  }
 // Displays the second half of the display data
  function displayFiveDay(data) {
    let List11 = document.querySelector(".col-sm-8");
    uviSet = false;

    let uvi = data.current.uvi;
    let headingElement3 = document.createElement("p");

    headingElement3.innerHTML =
      "UV Index: " + "<span class = 'block'>" + uvi + "</span>";
    List11.append(headingElement3);

    console.log("5 day forecast: ");
    console.log(data);
    let columns = ["#zero", "#one", "#two", "#three", "#four"];

    let heading2 = document.querySelector("#fiveDayHeading");
    heading2.textContent = "5-day Forecast:";
    for (var i = 0; i < 5; i++) {
      let myColumn = columns[i];
      let list3 = document.querySelector(myColumn);
      list3.innerHTML = "";
      list3.setAttribute("background-color", "blue");

      let cloudsIcon = document.createElement("img");
      let clouds = data.daily[i].weather[0].icon;

      cloudsIcon.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + clouds + ".png"
      );

      list3.append(cloudsIcon);
      let daily = data.daily[i].humidity;
      let temp = data.daily[i].temp.day;
      //console.log("Daily is: ");
      let additionalData = document.createElement("p");
      additionalData.innerHTML =
        "Temp: " +
        temp +
        "\xB0F" +
        "<br>" +
        "Humidity: " +
        daily +
        "%" +
        "<br>" +
        "<br>";
      list3.append(additionalData);
    }
  }
});

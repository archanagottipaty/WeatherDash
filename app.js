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

let list = document.querySelector("ul");
console.log("lsit is  is" + list);
let element = document.createElement("li");
element.textContent = cityName;

list.prepend(element);

 var key = "e3cdabf7296ad5ad27b92f8faad0a9a8";


//   var URL = `api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
//   var URL = `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=e3cdabf7296ad5ad27b92f8faad0a9a8`

 

   var URL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=e3cdabf7296ad5ad27b92f8faad0a9a8"


fetch(URL, {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  // cache: 'reload',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


});



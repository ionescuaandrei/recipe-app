let result = document.querySelector("#result");
let searchValue = document.querySelector("#search-input").value;
let searchButton = document.querySelector("#search-button");

let url = "www.themealdb.com/api/json/v1/1/search.php?s=";

fetch(url + "big mac")
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  });
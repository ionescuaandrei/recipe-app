// Variabile
let result = document.querySelector("#result");
let searchButton = document.querySelector("#search-button");

// Link Api: https://www.themealdb.com/api.php (primul API: Search by meal name)

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event buton + fetch data

searchButton.addEventListener("click", () =>{

  let searchValue = document.querySelector("#search-input").value;

  if(searchValue.length == 0){
    result.innerHTML = `<h3> Search input empty </h3>`
  }
  else{
    fetch(url + searchValue)
  .then(response => response.json())
  .then((data) => {
    let myMeal = data.meals[0];
    // debbuging in consola web pentru a observa daca primim un raspuns 
    console.log(myMeal);
    //
    let ingredients = [];

// Assuming each meal has up to 20 ingredients
  for (let i = 1; i <= 30; i++) {
  let ingredient = myMeal[`strIngredient${i}`];
  let measure = myMeal[`strMeasure${i}`];

  // If there's no ingredient, break out of the loop
  if (!ingredient) break;

  // Add the ingredient and its measurement to the array
  ingredients.push(`${measure} ${ingredient}`);
}

// The rest of the code for displaying the ingredients remains unchanged


    result.innerHTML=`
      <img src="${myMeal.strMealThumb}"></img>
      <div class="details">
      <h2>${myMeal.strMeal}</h2>
      <h4>${myMeal.strArea}</h4>
      
      <a href="${myMeal.strYoutube}" target="_blank" class="yt-link">
      <div class="link">
      <ion-icon name="logo-youtube" class="yt-icon"></ion-icon>
      <h4>Video for ${myMeal.strMeal}</h4>
      </div>
      </a>
      </div>

      <div id="ingredient-container">

      <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
      </div>
      <div id="view-recipe">
      <button id="show-recipe">View recipe</button>
      </div>
      </div>
      
    `;

    let ingredientContainer = document.querySelector("#ingredient-container");
    let parent = document.createElement("ul");
    let recipe = document.querySelector("#recipe");
    let recipeHide = document.querySelector("#hide-recipe");
    let recipeShow = document.querySelector("#show-recipe");

    ingredients.forEach((i) => {
      let child = document.createElement("li");
      child.innerText= i;
      parent.appendChild(child);
      ingredientContainer.appendChild(parent);
    });

    recipeHide.addEventListener('click', () => {
      recipe.style.display = "none";
    });

    recipeShow.addEventListener('click', () => {
      recipe.style.display = "block";
    })
  }).catch(()=>{
    result.innerHTML = `<h3>Something went wrong :(</h3>`;
  })
  }
});






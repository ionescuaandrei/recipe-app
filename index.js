let result = document.querySelector("#result");
let searchValue = document.querySelector("#search-input").value;
let searchButton = document.querySelector("#search-button");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

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
    console.log(myMeal);
    let count = 1;
    let ingredients = [];
    for (let i in myMeal) {
      let ingredient = "";
      let measure = ""; 
      if (i.startsWith("strIngredient") && myMeal[i]) {
        ingredient = myMeal[i];
        measure = myMeal[`strMeasure` + count];
        count++;
        console.log(ingredient, measure);
        ingredients.push(`${measure} ${ingredient}`)
      }
    }

    result.innerHTML=`
      <img src="${myMeal.strMealThumb}"></img>
      <div class="details">
      <h2>${myMeal.strMeal}</h2>
      <h4>${myMeal.strArea}</h4>
      </div>

      <div id="ingredient-container"></div>

      <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${myMeal.strInstructions}</pre>
      </div>
      <div id="view-recipe">
      <button id="show-recipe">View Recipe</button>
      <div>
      
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
    result.innerHTML = `<h3>Something went wrong</h3>`;
  })
  }
});






const app_id = "38418589";
const app_key = "6e344a72b040c0a8776bb69517005b9d";

var button = document.querySelector("button");

const get_recipe = async () => {
  var input = document.querySelector("input");

  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${input.value}&app_id=${app_id}&app_key=${app_key}`
  );
  var data = await response.json();

  var cards = document.querySelector(".Cards-section");
  cards.innerHTML = "";
  for (let i = 0; i < data.hits.length; i++) {
    const recipe = data.hits[i].recipe;
    
    // Create a description by joining the first few ingredient lines
    const description = recipe.ingredientLines.slice(0, 3).join(', ') + '...';

    cards.innerHTML += `
    <div class="card">
      <div class="card__body">
        <img
          src="${recipe.image}"
          alt=""
          class="card__image"
        />
        <h2 class="card__title">${recipe.label}</h2>
        <p class="card__description">
          ${description}
        </p>
      </div>
      <a href="${recipe.url}" class="card__btn">View Recipe</a>
    </div>
    `;
  }
};

button.addEventListener("click", get_recipe);

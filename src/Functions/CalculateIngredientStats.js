import ingredientFound from "./FindIngredient";

export default function GetRecipeInfo(recipe, userIngredients, favoritesList) {
  var alternateTypes = [];
  var ingredients = 0;
  var optionalIngredients = 0;
  var ownedIngredients = 0;
  var ownedOptionalIngredients = 0;
  //console.log(userIngredients);

  recipe.ingredientList.forEach((ingredient) => {
    if (ingredient && ingredient.type) {
      if (
        ingredient.type.toLowerCase().includes("alternate") ||
        ingredient.type.toLowerCase().includes("option")
      ) {
        alternateTypes.push(ingredient.type);
        optionalIngredients = optionalIngredients + 1;
          if (ingredientFound(ingredient, userIngredients)) {
            ownedOptionalIngredients = ownedOptionalIngredients + 1;
          }          
        
        
      } else {
        ingredients = ingredients + 1;
        
          if (ingredientFound(ingredient, userIngredients)) {
            ownedIngredients = ownedIngredients + 1;
          }
      
      }
    }
  });

  var ownedPercent = ownedIngredients / ingredients;
  var isFavorite = favoritesList.includes(recipe.videoId);

  let recipeInfo = {
    recipe,
    ingredients,
    optionalIngredients,
    ownedIngredients,
    ownedOptionalIngredients,
    ownedPercent,
    isFavorite,
  };

  return recipeInfo;
}

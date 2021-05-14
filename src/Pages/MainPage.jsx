import { useState, useEffect } from "react";
import GetRecipeInfo from "../Functions/CalculateIngredientStats";
import ingredientFound from "../Functions/FindIngredient";
import { getCompleteRecipes } from "../Adapters/RecipeAPIAdapter";
import {
  getUserData,
  updateUserFavorites,
  updateUserIngredients,
} from "../Adapters/UserAPIAdapter";
import MainContent from "../Components/MainContent";

export default function MainPage({ user, serverUrl }) {
  const [loading, setLoading] = useState(true);
  const [displayedRecipes, setDisplayedRecipes] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userIngredients, setUserIngredients] = useState([]);
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [displayedIngredients, setDisplayedIngredients] = useState([]);

  useEffect(() => {
    async function initializeState() {
      var recipes = await getCompleteRecipes();
      var allIngredients = getAllIngredients(recipes);
      var userData = await getUserData(user);
      let recipeInfo = updateRecipeStats(
        recipes,
        userData.ingredientList,
        userData.favoriteRecipes
      );
      recipeInfo = sortResults(recipeInfo);

      setFavorites(userData.favoriteRecipes);
      setUserIngredients(userData.ingredientList);
      setSortedRecipes(recipeInfo);
      setDisplayedRecipes(recipeInfo);
      setAllIngredients(allIngredients);
      setDisplayedIngredients(allIngredients);
      setLoading(false);
    }
    initializeState();
  }, []);

  const getAllIngredients = (recipes) => {
    var allIngredientNames = [];
    var allIngredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredientList.forEach((ingredient) => {
        if (!ingredientFound(ingredient, allIngredientNames)) {
          allIngredientNames.push(ingredient.name);
          allIngredients.push(ingredient);
        }
      });
    });

    allIngredients.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return allIngredients;
  };

  const updateRecipeStats = (
    recipes,
    ingredientList,
    favoriteRecipes,
    addIngredient
  ) => {
    var recipeInfo = [];

    recipes.forEach((recipe) => {
      var recipeStats = GetRecipeInfo(
        recipe,
        ingredientList,
        favoriteRecipes,
        addIngredient
      );
      recipeInfo.push(recipeStats);
    });
    return recipeInfo;
  };

  const setRecipeFilter = (filterQuery) => {
    let filter = filterQuery.toString().toLowerCase();
    if (filterQuery === "") {
      setFilterName("");
      setDisplayedRecipes(sortedRecipes);
    } else {
      setFilterName("Results for: " + filterQuery);
      let foundRecipes = [];
      let foundIngredients = [];
      sortedRecipes.forEach((recipeInfo) => {
        if (
          recipeInfo.recipe.name &&
          (recipeInfo.recipe.name.toString().toLowerCase().includes(filter) ||
            recipeInfo.recipe.videoInfo.description.includes(filter))
        ) {
          foundRecipes.push(recipeInfo);
        } else {
          var recipeFound = false;
          recipeInfo.recipe.ingredientList.forEach((ingredient) => {
            if (
              ingredient.name &&
              ingredient.name.toString().toLowerCase().includes(filter)
            ) {
              recipeFound = true;
            }
          });
          if (recipeFound) foundIngredients.push(recipeInfo);
        }
      });
      foundIngredients.forEach((p) => foundRecipes.push(p));
      foundRecipes = sortResults(foundRecipes);

      setDisplayedRecipes(foundRecipes);
    }
  };

  const sortResults = (results) => {
    results.sort((a, b) => {
      return b.ownedPercent - a.ownedPercent;
    });
    results.sort((a, b) => {
      return b.isFavorite - a.isFavorite;
    });
    return results;
  };

  const setIngredientFilter = (filterQuery) => {
    let filter = filterQuery.toString().toLowerCase();
    if (filterQuery === "") {
      setDisplayedIngredients(allIngredients);
    } else {
      let foundIngredients = [];
      allIngredients.forEach((ingredient) => {
        if (
          (ingredient.name &&
            ingredient.name.toString().toLowerCase().includes(filter)) ||
          (ingredient.type &&
            ingredient.type.toString().toLowerCase().includes(filter))
        ) {
          foundIngredients.push(ingredient);
        }
      });
      console.log("Setting Displayed Ingredients");
      console.log(foundIngredients);
      setDisplayedIngredients(foundIngredients);
    }
  };

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const addFavorite = async (favorite) => {
    var newList = [];
    if (favorites.includes(favorite)) {
      favorites.forEach((i) => {
        if (i !== favorite) newList.push(i);
      });
    } else {
      newList = favorites.concat(favorite);
    }
    setFavorites(newList);
    updateUserFavorites(user, newList);
  };

  const addUserIngredient = async (ingredient) => {
    var newList = [];
    var ingredientFound = false;
    for (let index = 0; index < userIngredients.length; index++) {
      console.log(
        "UserIngredient: " +
          userIngredients[index] +
          "Added Ingredient: " +
          ingredient.name
      );
      if (userIngredients[index] === ingredient.name) {
        ingredientFound = true;
        break;
      }
    }
    if (ingredientFound) {
      console.log("Removing ingredient");
      userIngredients.forEach((i) => {
        if (i !== ingredient.name) newList.push(i);
      });
    } else {
      console.log("Adding Ingredient");
      newList = userIngredients.concat(ingredient.name);
      console.log("Sending Ingredient List: ");
      console.log(newList);
    }

    let recipeInfo = updateRecipeStats(displayedRecipes, newList, favorites);
    setUserIngredients(newList);
    setDisplayedRecipes(recipeInfo);
    updateUserIngredients(user, newList);
  };

  return loading ? (
    "Loading..."
  ) : (
    <MainContent
      setRecipeFilter={setRecipeFilter}
      toggleDrawerOpen={toggleDrawerOpen}
      drawerOpen={drawerOpen}
      displayedIngredients={displayedIngredients}
      userIngredients={userIngredients}
      addUserIngredient={addUserIngredient}
      setIngredientFilter={setIngredientFilter}
      filterName={filterName}
      user={user}
      displayedRecipes={displayedRecipes}
      addFavorite={addFavorite}
    />
  );
}

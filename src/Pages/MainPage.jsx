import { useState, useEffect } from "react";
import SearchAppBar from "../Components/ApplicationBar";
import Header from "../Components/Header";
//import {Filter} from '../Components/Filter.jsx';
import RecipeGrid from "../Components/RecipeGrid";
//import {Footer} from '../Components/Footer'
import SideDrawer from "../Components/SideDrawer";

import GetRecipeInfo from "../Functions/CalculateIngredientStats";
import ingredientFound from "../Functions/FindIngredient";

export default function MainPage(props) {
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
    async function initializeUser() {
      console.log("Intializing User");
      let apiUrl = `https://fly-recipe-server.herokuapp.com/api/v1/users/${props.user.username}/add-user/`; // add-user only adds if needed
      let response = await fetch(apiUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "PUT",
      });
      let data = await response.json();
      let recipeInfo = updateRecipeStats(
        props.recipes,
        data.ingredientList,
        data.favoriteRecipes
      );
      recipeInfo = sortResults(recipeInfo);
      setFavorites(data.favoriteRecipes);
      setUserIngredients(data.ingredientList);
      setSortedRecipes(recipeInfo);
      setDisplayedRecipes(recipeInfo);
      var allIngredients = getAllIngredients();
      setAllIngredients(allIngredients);
      setDisplayedIngredients(allIngredients);

      setLoading(false);
    }

    initializeUser();
  }, []);

  function getAllIngredients() {
    var allIngredients = [];

    props.recipes.forEach((recipe) => {
      recipe.ingredientList.forEach((ingredient) => {
        if (!ingredientFound(ingredient, allIngredients)) {
          allIngredients.push(ingredient);
        }
      });
    });

    allIngredients.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return allIngredients;
  }

  function updateRecipeStats(
    recipes,
    ingredientList,
    favoriteRecipes,
    addIngredient
  ) {
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
  }

  function setRecipeFilter(filterQuery) {
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
  }

  function sortResults(results) {
    results.sort((a, b) => {
      return b.ownedPercent - a.ownedPercent;
    });
    results.sort((a, b) => {
      return b.isFavorite - a.isFavorite;
    });
    return results;
  }

  function setIngredientFilter(filterQuery) {
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
  }

  function toggleDrawerOpen() {
    setDrawerOpen(!drawerOpen);
  }

  async function addFavorite(favorite) {
    var newList = [];
    if (favorites.includes(favorite)) {
      favorites.forEach((i) => {
        if (i !== favorite) newList.push(i);
      });
    } else {
      newList = favorites.concat(favorite);
    }

    setFavorites(newList);

    let apiUrl = `https://fly-recipe-server.herokuapp.com/api/v1/users/${props.user.username}/update-favorites/`; // add-user only adds if needed
    let response = await fetch(apiUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(newList),
    });
  }

  async function addUserIngredient(ingredient) {
    var newList = [];
    var ingredientFound = false;
    for (let index = 0; index < userIngredients.length; index++) {
      if (userIngredients[index].name === ingredient.name) {
        ingredientFound = true;
        break;
      }
    }
    if (ingredientFound) {
      console.log("Removing ingredient");
      userIngredients.forEach((i) => {
        if (i.name !== ingredient.name) newList.push(i);
      });
    } else {
      console.log("Adding Ingredient");
      newList = userIngredients.concat(ingredient);
    }

    setUserIngredients(newList);

    let apiUrl = `https://fly-recipe-server.herokuapp.com/api/v1/users/${props.user.username}/update-ingredients/`; // add-user only adds if needed
    let response = await fetch(apiUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(newList),
    });
  }

  return loading ? (
    "Loading..."
  ) : (
    <div style={{ backgroundColor: "lightslategray" }}>
      <SearchAppBar
        setFilter={setRecipeFilter}
        toggleDrawerOpen={toggleDrawerOpen}
      />
      <SideDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawerOpen}
        allIngredients={displayedIngredients}
        userIngredients={userIngredients}
        addIngredient={addUserIngredient}
        setIngredientFilter={setIngredientFilter}
      />
      <Header
        filterName={filterName}
        user={props.user}
        recipeCount={props.recipes.length}
      />
      {/* <Container>
        <Filter recipes = {allCompleteRecipes} setRecipes = {setDisplayedRecipes}/>
      </Container> */}
      <RecipeGrid
        recipes={displayedRecipes}
        userIngredients={userIngredients}
        addFavorite={addFavorite}
        addIngredient={addUserIngredient}
      />
      {/* <Container>
        <Footer />
      </Container> */}
    </div>
  );
}

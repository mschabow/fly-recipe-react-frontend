
import React, { useState, useEffect} from "react";
import SearchAppBar from "../Components/ApplicationBar";
import Header from '../Components/Header'
//import {Filter} from '../Components/Filter.jsx';
import RecipeGrid from '../Components/RecipeGrid'
//import {Footer} from '../Components/Footer'
import SideDrawer from '../Components/SideDrawer'






export default function MainPage(props){
  const[displayedRecipes, setDisplayedRecipes] = useState(props.recipes);
  const[filterName, setFilterName] = useState("");
  const[drawerOpen, setDrawerOpen] = useState(false)
  const[favorites, setFavorites] = useState([]);
  const[ingredients, setIngredients] = useState([]);

  
  useEffect(() => {
    async function initializeUser() {
      
      let apiUrl = `http://localhost:8080/api/v1/users/${props.user.username}/add-user`; // add-user only adds if needed
      let  response = await fetch(apiUrl, {headers:{
        'Access-Control-Allow-Origin':'*'
        }, method: 'PUT'});
      //console.log("response: " + response.json())
      let  data = await response.text;
      console.log(data);

      apiUrl = `http://localhost:8080/api/v1/users/${props.user.username}/get-favorite-recipes`;
      response = await fetch(apiUrl);
      //console.log("response: " + response.json())
      data = await response.json();
      setFavorites(data.favoriteRecipes);

      apiUrl = `http://localhost:8080/api/v1/users/${props.user.username}/get-ingredients`;
      response = await fetch(apiUrl);
      //console.log("response: " + response.json())
      data = await response.json();
      setIngredients(data.ownedIngredients);
    }

    
    initializeUser();
  }, [props.user.username]);


  useEffect(() => {
    
  }, [props.user.name]);

  useEffect(() => {
    
  }, [props.user.name]);


  function setSearchFilter(filterQuery){
       let filter = filterQuery.toString().toLowerCase();
        if (filterQuery === "") {
          setFilterName("");
          setDisplayedRecipes(props.recipes);
        } else {
          setFilterName("Results for: " + filterQuery);
          let foundRecipes = [];
          let foundIngredients = []
          props.recipes.forEach((recipe) => {
            if (
              recipe.name.toString().toLowerCase().includes(filter) ||
              recipe.videoInfo.description.includes(filter)
            ) {
              foundRecipes.push(recipe);
            } else var recipeFound = false;
            recipe.ingredientList.forEach((ingredient) => {
              if (ingredient.name.toString().toLowerCase().includes(filter)) {
                recipeFound = true;
              }
            });
            if (recipeFound) foundIngredients.push(recipe);
          });
          foundIngredients.forEach(p => foundRecipes.push(p));
          setDisplayedRecipes(foundRecipes);
        }      
  }

  function toggleDrawerOpen(){
    setDrawerOpen(!drawerOpen);
  }

  function addFavorite(favorite){
    if(favorites.includes(favorite))
      {
        var newList = [];
        favorites.forEach(i => {
          if(!i.equals(favorite)) newList.push(i);
        })
        setFavorites(newList);
    }
    else setFavorites(favorites.push(favorite));
    //TODO: Update Server
  }

  function addIngredient(ingredient){
    setIngredients(ingredients.push(ingredient));
    //TODO: Update Server
  }

  return (
    <>
      
        <SearchAppBar
          setFilter={setSearchFilter}
          toggleDrawerOpen={toggleDrawerOpen}
        />
      
      
        <SideDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawerOpen}/>
      
        <Header filterName={filterName} user={props.user} />
      
      {/* <Container>
        <Filter recipes = {allCompleteRecipes} setRecipes = {setDisplayedRecipes}/>
      </Container> */}
      
        <RecipeGrid recipes={displayedRecipes} favorites={favorites} ingredients={ingredients} addFavorite={addFavorite} addIngredient={addIngredient} />
     
      {/* <Container>
        <Footer />
      </Container> */}
    </>
  );
}

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Hidden,
  Button,
  ButtonGroup,
  TextField,
  AppBar,
  Paper,
  Card,
  Typography,
} from "@material-ui/core"; 

import SearchAppBar from "../Components/ApplicationBar";
import Header from '../Components/Header'
//import {Filter} from '../Components/Filter.jsx';
import RecipeGrid from '../Components/RecipeGrid'
import { Timer } from "@material-ui/icons";
//import {Footer} from '../Components/Footer'



export default function MainPage(props){
  const[displayedRecipes, setDisplayedRecipes] = useState(props.recipes);
  const[filterName, setFilterName] = useState("");

  function setSearchFilter(filterQuery){
        console.log(filterQuery);
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

  return (
    <>
      <Container>
        <SearchAppBar setFilter={setSearchFilter} />
      </Container>
      <Container>
        <Header filterName={filterName} />
      </Container>
      {/* <Container>
        <Filter recipes = {allCompleteRecipes} setRecipes = {setDisplayedRecipes}/>
      </Container> */}
      <Container>
        <RecipeGrid recipes={displayedRecipes} />
      </Container>
      {/* <Container>
        <Footer />
      </Container> */}
    </>
  );
}
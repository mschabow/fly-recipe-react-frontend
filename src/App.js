import React, { useState, useEffect } from "react";
import {GetCompleteRecipes} from './Hooks/GetCompleteRecipes'
import MainPage from './Pages/MainPage'


function App() {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  //GetCompleteRecipes(setRecipes, setLoading);
  useEffect(() => {
    async function fetchRecipes() {
      const apiUrl = "http://localhost:8080/api/v1/recipes/complete/";
      const response = await fetch(apiUrl);
      //console.log("response: " + response.json())
      const data = await response.json();
      setRecipes(data.recipes);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  return (
    <>
      {loading ? "Loading..." : <MainPage recipes = {recipes}/>}
    </>
  );
}

export default App;

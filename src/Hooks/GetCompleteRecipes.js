 import React, { useState, useEffect } from "react";

export const GetCompleteRecipes = (setRecipes, setLoading) => {
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

 }



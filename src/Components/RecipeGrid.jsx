import { Grid } from "@material-ui/core";

import RecipeCard from "./RecipeCard";

export default function RecipeGrid({
  recipes,
  userIngredients,
  addFavorite,
  addIngredient,
}) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="left"
      spacing={4}
      style={{ backgroundColor: "lightSlateGray" }}
    >
      {recipes.map((recipeInfo) => {
        return (
          <Grid item key={recipeInfo.recipe.videoId} xs="12" sm="6">
            <RecipeCard
              recipeInfo={recipeInfo}
              userIngredients={userIngredients}
              addFavorite={addFavorite}
              addIngredient={addIngredient}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

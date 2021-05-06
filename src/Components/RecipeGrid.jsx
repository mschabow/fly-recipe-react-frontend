import { Grid, Paper } from "@material-ui/core";

import RecipeCard from "./RecipeCard";

export default function RecipeGrid (props){

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
      
    >
      {props.recipes.map((recipeInfo) => {
        return (
          <Grid item key={recipeInfo.recipe.videoId}>
            <Paper>
              <RecipeCard
                recipeInfo={recipeInfo}
                userIngredients={props.userIngredients}
                addFavorite={props.addFavorite}
                addIngredient={props.addIngredient}
              />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

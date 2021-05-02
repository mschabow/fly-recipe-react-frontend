import { Grid } from "@material-ui/core";

import RecipeCard from "./RecipeCard";

export default function RecipeGrid (props)
{

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      {props.recipes.map((recipe) => {
        return (
          <Grid item key={recipe.name}>
            <RecipeCard recipe={recipe} favorites={props.favorites} ingredients={props.ingredients} addFavorite={props.addFavorite} addIngredient={props.addIngredient}/>
          </Grid>
        );
      })}
    </Grid>
  );
}

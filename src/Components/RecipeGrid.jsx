import {Container, Grid, Typography} from '@material-ui/core'

import RecipeCard from '../Components/RecipeCard'

export default function RecipeGrid(props){

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing="4">
      {props.recipes.map(recipe => {
        return <Grid item>
          <RecipeCard recipe = {recipe}/>
        </Grid>;
      })}
      
    </Grid>
  );
}
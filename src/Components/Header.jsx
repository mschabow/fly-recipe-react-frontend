import React from "react"
import {Typography} from '@material-ui/core'

export default function Header(props){
  return(
    <div> 
        <Typography variant="h7" align="center" color="textPrimary">
          <h3>{props.recipeCount} Fly Recipes from Fly Fish Food</h3>
          <h4>{props.filterName}</h4>
          </Typography>
    </div>
  );
}
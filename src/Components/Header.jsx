import React from "react"
import {Container, Typography} from '@material-ui/core'

export default function Header(props){
  return(
    <>    
      <Container>
        <Typography component="span">
          <h3>Fly Recipes from Fly Fish Food</h3>
          <h4>{props.filterName}</h4>
          </Typography>
    
      </Container>
    </>
  );
}
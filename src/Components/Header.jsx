import React from "react"
import {AppBar, Container, Typography} from '@material-ui/core'
import HomeIcon from "@material-ui/icons/Home";
export default function Header(props){
  return(
    <>    
      <Container>
        <Typography>
          <h3>Fly Recipes from Fly Fish Food</h3>
          <h4>{props.filterName}</h4>
          </Typography>
    
      </Container>
    </>
  );
}
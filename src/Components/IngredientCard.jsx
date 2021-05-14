import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Container, Grid } from "@material-ui/core";
import ShopIcon from "@material-ui/icons/Shop";

export default function IngredientCard({
  ingredient,
  userIngredients,
  addIngredient,
  hideType,
}) {
  const [Icon, setIcon] = useState(<AddIcon />);
  const [color, setColor] = useState("lightGray");
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    var ingredientFound = false;
    for (let index = 0; index < userIngredients.length; index++) {
      if (userIngredients[index] === ingredient.name) {
        ingredientFound = true;
        break;
      }
    }

    if (ingredientFound) {
      setIsOwned(true);
      setIcon(<RemoveIcon />);
      setColor("lightGreen");
      return;
    } else {
      setIsOwned(false);
      setIcon(<AddIcon />);
      setColor("lightGray");
      return;
    }
  }, [userIngredients]);

  function handleAddDelete(ingredient) {
    if (!isOwned) {
      setIsOwned(!isOwned);
      setIcon(<RemoveIcon />);
      setColor("primary");
    } else {
      setIsOwned(!isOwned);
      setIcon(<AddIcon />);
      setColor("disabled");
    }
    addIngredient(ingredient);
  }

  function handleClick(ingredientLink) {
    window.open(`https://www.flyfishfood.com${ingredient.link}`, "_blank");
  }

  return (
    <Container>
      <Card style={{ backgroundColor: color }}>
        {!hideType && (
          <Typography variant="caption" align="left">
            {ingredient.type}
          </Typography>
        )}
        <Grid container spacing={1}>
          <Grid item xs="2">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleAddDelete(ingredient)}
            >
              {Icon}
            </IconButton>
          </Grid>
          <Grid item xs="8">
            <Typography variant="button" component="p" align="left">
              {ingredient.name && ingredient.name}
            </Typography>
          </Grid>
          <Grid item xs="2">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleClick(ingredient.link)}
            >
              <ShopIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

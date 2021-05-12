import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Chip, Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ShopIcon from "@material-ui/icons/Shop";
import { Shop } from "@material-ui/icons";

export default function IngredientCard(props) {
  const { ingredient, userIngredients, addIngredient, hideType } = props;
  const [Icon, setIcon] = useState(<AddIcon />);
  const [color, setColor] = useState("lightGray");
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    var ingredientFound = false;
    for (let index = 0; index < userIngredients.length; index++) {
      if (userIngredients[index].name === ingredient.name) {
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

        {/* <Chip
        size="small"
        label={ingredient.name && ingredient.name.substring(0, 30)}
        color={color}
        deleteIcon={icon}
        onDelete={() => onAddDelete(ingredient)}
        onClick={() => handleClick(ingredient.link)}
      /> */}
      </Card>
    </Container>
  );
}

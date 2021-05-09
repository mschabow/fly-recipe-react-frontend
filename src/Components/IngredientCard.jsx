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
import { Chip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 250,
    maxHeight: 100,
  },
});

export default function IngredientCard(props) {
  const { ingredient, userIngredients, addIngredient, hideType } = props;
  const [icon, setIcon] = useState(<AddIcon />);
  const [color, setColor] = useState("disabled");
  const [isOwned, setIsOwned] = useState(false);
  const classes = useStyles();

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
      setColor("primary");
      return;
    } else {
      setIsOwned(false);
      setIcon(<AddIcon />);
      setColor("disabled");
      return;
    }
  }, [userIngredients]);

  function onAddDelete(ingredient) {
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

  function IngredeintType(){
    return (
      !hideType && <Typography variant="body2">{ingredient.type}</Typography>
    )
  }

  return (
    <>
      <IngredeintType />

      <Chip
        size="small"
        label={ingredient.name && ingredient.name.substring(0, 30)}
        color={color}
        deleteIcon={icon}
        onDelete={() => onAddDelete(ingredient)}
        onClick={() => handleClick(ingredient.link)}
      />
    </>
  );
}

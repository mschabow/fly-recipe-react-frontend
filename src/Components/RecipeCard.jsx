import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import YouTubeIcon from "@material-ui/icons/YouTube";
import IngredientCard from "../Components/IngredientCard";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeCard({
  recipeInfo,
  userIngredients,
  addFavorite,
  addIngredient,
}) {
  const {
    recipe,
    ingredients,
    optionalIngredients,
    ownedIngredients,
    ownedOptionalIngredients,
    isFavorite,
  } = recipeInfo;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState("disabled");
  const [loading, setLoading] = useState(true);
  const [ownedCount, setOwnedCount] = useState(ownedIngredients);
  const [ownedOptionalCount, setOwnedOptionalCount] = useState(
    ownedOptionalIngredients
  );

  useEffect(() => {
    if (isFavorite) {
      setFavoriteColor("secondary");
    }
    setLoading(false);
  }, [isFavorite]);

  useEffect(() => {
    setOwnedCount(ownedIngredients);
    setOwnedOptionalCount(ownedOptionalIngredients);
  }, [recipeInfo]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    addFavorite(recipe.videoId);
    favoriteColor === "disabled"
      ? setFavoriteColor("secondary")
      : setFavoriteColor("disabled");
  };

  const updateOwnedCount = (number) => {
    setOwnedCount(ownedCount + number);
  };
  const updateOwnedOptionalCount = (number) => {
    setOwnedOptionalCount(ownedOptionalCount + number);
  };

  return loading ? (
    ""
  ) : (
    <Container>
      <Card>
        {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={recipe.name}
        subheader="September 14, 2016"
      /> */}
        <CardMedia
          className={classes.media}
          image={recipe.videoInfo.thumbnail.url.replace("default", "sddefault")}
          title={recipe.name}
        />
        <CardContent>
          {/* <Typography variant="body2" color="textSecondary" component="p" noWrap="true">
          {recipe.name.replace("by Fly Fish Food", "")}
        </Typography> */}
          <Typography variant="body2" color="textSecondary" component="p">
            {`Owned Ingredients: ${ownedCount} / ${ingredients}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Alternate Ingredients: ${ownedOptionalCount} / ${optionalIngredients}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleFavoriteClick}
          >
            <FavoriteIcon color={favoriteColor} />
          </IconButton>
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          <IconButton aria-label="watch youtube video">
            <a
              href={`https://www.youtube.com/watch?v=${recipe.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <YouTubeIcon />
            </a>
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={1}
              style={{ padding: 0, margin: 0 }}
            >
              {recipe.ingredientList.map((ingredient) => {
                return (
                  <Grid item key={ingredient.id}>
                    <IngredientCard
                      ingredient={ingredient}
                      userIngredients={userIngredients}
                      addIngredient={addIngredient}
                      updateOwnedCount={updateOwnedCount}
                      updateOwnedOptionalCount={updateOwnedOptionalCount}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}

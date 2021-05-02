import React from "react";
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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import YouTubeIcon from "@material-ui/icons/YouTube"
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
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



export default function RecipeCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [favoriteColor, setFavoriteColor] = React.useState('disabled')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () =>{
    props.addFavorite(props.recipe.videoId);
    favoriteColor==='disabled' ? setFavoriteColor('secondary') : setFavoriteColor('disabled');
    
  }
 

  return (
    <Card className={classes.root}>
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
        title={props.recipe.name}
        subheader="September 14, 2016"
      /> */}
      <CardMedia
        className={classes.media}
        image={props.recipe.videoInfo.thumbnail.url.replace(
          "default",
          "sddefault"
        )}
        title={props.recipe.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="span">
          {props.recipe.name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavoriteClick } >
          <FavoriteIcon  color={favoriteColor}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="watch youtube video">
          <a
            href={`https://www.youtube.com/watch?v=${props.recipe.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <YouTubeIcon />
          </a>
        </IconButton>
        <CheckIcon/>

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
          <Typography component="span">Ingredients:</Typography>
          {props.recipe.ingredientList.map((ingredient, name) => (
            <Typography key={name} component="span">
              <b>
                <u>{ingredient.type}</u>
              </b>
              : <i>{ingredient.name}</i>
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

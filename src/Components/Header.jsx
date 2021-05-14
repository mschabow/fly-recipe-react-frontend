import { Typography } from "@material-ui/core";

export default function Header({ recipeCount, filterName }) {
  return (
    <div>
      <Typography variant="h7" align="center" color="textPrimary">
        <h3>{recipeCount} Fly Recipes from Fly Fish Food</h3>
        <h4>{filterName}</h4>
      </Typography>
    </div>
  );
}

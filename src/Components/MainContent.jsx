import { Container } from "@material-ui/core";
import SearchAppBar from "../Components/ApplicationBar";
import Header from "../Components/Header";
import RecipeGrid from "../Components/RecipeGrid";
import SideDrawer from "../Components/SideDrawer";

export default function MainContent({
  setRecipeFilter,
  toggleDrawerOpen,
  drawerOpen,
  displayedIngredients,
  userIngredients,
  addUserIngredient,
  setIngredientFilter,
  filterName,
  user,
  displayedRecipes,
  addFavorite,
}) {
  return (
    <>
      <SearchAppBar
        setFilter={setRecipeFilter}
        toggleDrawerOpen={toggleDrawerOpen}
      />
      <SideDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawerOpen}
        allIngredients={displayedIngredients}
        userIngredients={userIngredients}
        addIngredient={addUserIngredient}
        setIngredientFilter={setIngredientFilter}
      />
      <Container style={{ marginTop: 75, padding: 0 }}>
        <Header
          filterName={filterName}
          user={user}
          recipeCount={displayedRecipes.length}
        />
        <RecipeGrid
          recipes={displayedRecipes}
          userIngredients={userIngredients}
          addFavorite={addFavorite}
          addIngredient={addUserIngredient}
        />
      </Container>
    </>
  );
}

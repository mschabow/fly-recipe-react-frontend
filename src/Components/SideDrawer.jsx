import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Grid } from "@material-ui/core";
import IngredientCard from "../Components/IngredientCard";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: "500",
  },
});



export default function SideDrawer(props) {
  const {
    drawerOpen,
    toggleDrawer,
    allIngredients,
    userIngredients,
    addIngredient,
    setIngredientFilter
  } = props;
  const classes = useStyles();
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  const searchHandler = (query) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setIngredientFilter(query);
      }, 800)
    );
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: true,
      })}
      role="presentation"
      // onClick={() => toggleDrawer()}
      // onKeyDown={() => toggleDrawer()}
    >
      <List>
        <AmplifySignOut position="sticky" />
        <Divider />
        <div position="sticky" className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              searchHandler(e.target.value);
            }}
          />
        </div>
        <Divider />
        <Grid container direction="row" justify="left" spacing={2}>
          {allIngredients.map((ingredient) => {
            return (
              <Grid item key={ingredient.id}>
                <IngredientCard
                  ingredient={ingredient}
                  userIngredients={userIngredients}
                  addIngredient={addIngredient}
                  hideType={true}
                />
              </Grid>
            );
          })}
        </Grid>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer()}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}

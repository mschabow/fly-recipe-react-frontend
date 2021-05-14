import React from "react";
import clsx from "clsx";
import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";
import IngredientCard from "../Components/IngredientCard";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 425,
  },
  fullList: {
    width: "auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SideDrawer(props) {
  const {
    drawerOpen,
    toggleDrawer,
    allIngredients,
    userIngredients,
    addIngredient,
    setIngredientFilter,
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
    >
      <List>
        <Button fullWidth="true" color="primary" onClick={() => toggleDrawer()}>
          Close Ingredients Drawer
        </Button>
        <Divider />
        <AmplifySignOut position="fixed" />
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
        <Grid
          container
          direction="row"
          justify="left"
          spacing={1}
          style={{ marginTop: 5 }}
        >
          {allIngredients.map((ingredient) => {
            return (
              <Grid item xs="12" key={ingredient.id}>
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

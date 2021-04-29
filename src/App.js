import React, { useState, useEffect } from "react";
import {AmplifySignOut, AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import MainPage from "./Pages/MainPage";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  //GetCompleteRecipes(setRecipes, setLoading);
  useEffect(() => {
    async function fetchRecipes() {
      const apiUrl = "http://localhost:8080/api/v1/recipes/complete/";
      const response = await fetch(apiUrl);
      //console.log("response: " + response.json())
      const data = await response.json();
      setRecipes(data.recipes);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
        {console.log(user)}
        <div>Hello, {user.attributes.name}</div>
        <>{loading ? "Loading..." : <MainPage recipes={recipes} />}</>
        <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email Address: (used as username)",
            placeholder: "name@something.com",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "password",
            required: true,
          },
          {
            type: "name",
            label: "First and Last Name",
            placeholder: "John Doe",
            required: true,
          },
        ]} 
      />
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
    </AmplifyAuthenticator>
);
}


export default App;


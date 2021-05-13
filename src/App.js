import { useState, useEffect } from "react";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import MainPage from "./Pages/MainPage";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  //GetCompleteRecipes(setRecipes, setLoading);
  useEffect(() => {}, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      {console.log(user)}
      <MainPage user={user} />
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

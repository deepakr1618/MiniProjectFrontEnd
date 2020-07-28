import React, { createContext, useReducer, useEffect } from "react";
import "./styles.css";
import { createMuiTheme, ThemeProvider, Grid } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import { fire } from "./utils/firebase";
import reducer from "./redux/reducer";
import SignUp from "./components/singup";
import Login from "./components/login";
import Header from "./components/header";
import MainPage from "./components/mainpage";
import "./app.scss";

const theme = createMuiTheme({
  test: {},
  palette: {
    primary: {
      main: "#f44336"
    },
    secondary: {
      main: "#e91e63"
    }
  }
});

export const UserContext = createContext();
const initialState = {
  user: undefined,
  name: undefined
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fire.auth().onAuthStateChanged(user => {
      dispatch({
        type: "SET_USER",
        payload: user
      });
      if (user) {
        fire
          .firestore()
          .doc(`users/${user.uid}`)
          .get()
          .then(data => {
            console.log(data.data());
            dispatch({
              type: "SET_NAME",
              payload: data.data().name
            });
          });
      }
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ state, dispatch }}>
          {!state.user ? (
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12}>
                <h1>Smart Answer Evaluator</h1>
              </Grid>
              <Grid item xs={10}>
                <Grid container justify="space-between">
                  <Grid item style={{ padding: "10px" }} xs={12} sm={6}>
                    <SignUp />
                  </Grid>
                  <Grid item style={{ padding: "10px" }} xs={12} sm={6}>
                    <Login />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Header />
          )}

          <div>{state.user ? <MainPage /> : null}</div>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

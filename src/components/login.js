import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { fire } from "../utils/firebase";
import "./signup.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    try {
      const { user } = await fire
        .auth()
        .signInWithEmailAndPassword(username, password);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="login-container">
      <div className="inner-container login">
        <h4>Log In</h4>
        <TextField
          color="secondary"
          label="Username"
          value={username}
          onChange={data => setUsername(data.currentTarget.value)}
          variant="outlined"
        />
        <TextField
          id="standard-basic"
          color="secondary"
          label="Password"
          value={password}
          onChange={data => setPassword(data.currentTarget.value)}
          variant="outlined"
          type="password"
        />
        <Button variant="contained" color="secondary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

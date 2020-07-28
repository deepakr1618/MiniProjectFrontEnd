import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { fire } from "../utils/firebase";
import "./signup.scss";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SignUp() {
  const { state, dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submitData() {
    try {
      const { user } = await fire
        .auth()
        .createUserWithEmailAndPassword(username, password);
      const userRef = await fire
        .firestore()
        .collection("users")
        .doc(`${user.uid}`)
        .set({
          name,
          uid: user.uid
        })
        .then(data => {});
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login-container">
      <div className="inner-container">
        <h4>Sign Up</h4>
        <TextField
          id="standard-basic"
          label="Username"
          value={username}
          onChange={data => setUsername(data.currentTarget.value)}
          variant="outlined"
        />
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          onChange={data => setName(data.currentTarget.value)}
          variant="outlined"
        />

        <TextField
          id="standard-basic"
          label="Password"
          value={password}
          onChange={data => setPassword(data.currentTarget.value)}
          variant="outlined"
          type="password"
        />
        <Button variant="contained" color="primary" onClick={submitData}>
          Signup
        </Button>
      </div>
    </div>
  );
}

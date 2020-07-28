import React, { useContext } from "react";
import { UserContext } from "../App";
import { fire } from "../utils/firebase";
import Button from "@material-ui/core/Button";
import "./header.scss";

export default function Header() {
  const { state, dispatch } = useContext(UserContext);
  return (
    <div className="header-container">
      <div className="inner-container">
        <p> Welcome, {state.name}</p>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            fire.auth().signOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

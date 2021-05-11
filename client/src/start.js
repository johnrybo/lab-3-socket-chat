import "./App.css";
import React, { useContext } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: "none",
    },
  }));

const Start = () => {

    const classes = useStyles();
    const { username, getUsername } =
    useContext(ChatContext);


  return (
    <div className="Start">
      <TextField
        value={username}
        label="Username"
        onChange={(event) => getUsername(event.target.value)}
      />
        
        {username.length > 0 ? (
      <Link className={classes.link} to={"rooms"}>
      <Button
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Create user
        </Button>
          </Link>
        ) : (
        <Button
          disabled={true}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Create user
        </Button>
        )}
    </div>
  );
};

export default Start;

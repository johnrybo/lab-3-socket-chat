import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

function Start() {
  const classes = useStyles();
  const { room, getUsername, joinRoom, setPassword, setRoom } =
    useContext(ChatContext);

  const [checked, setChecked] = useState(false);

  function askToCreateRoom() {
    joinRoom(room);
  }

  return (
    <div className="Start">
      <TextField
        label="Username"
        onChange={(event) => getUsername(event.target.value)}
      />
      <TextField
        label="Room"
        onChange={(event) => setRoom(event.target.value)}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={() => setChecked(!checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Private room"
      />
      {checked ? (
        <TextField
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      ) : null}
      <Link className={classes.link} to={`/${room.name}`}>
        <Button
          onClick={askToCreateRoom}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Create room
        </Button>
      </Link>
    </div>
  );
}

export default Start;

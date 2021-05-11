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
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
}));

function Rooms() {
  const classes = useStyles();
  const {
    username,
    rooms,
    room,
    getUsername,
    joinRoom,
    joinLockedRoom,
    setPassword,
    setRoom,
  } = useContext(ChatContext);

  const [checked, setChecked] = useState(false);

  function askToCreateRoom() {
    joinRoom(room);
  }

  return (
    <div className="Start">
      <TextField
        value={username}
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

      {room.name.length > 0 && username.length > 0 ? (
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
      ) : (
        <Button
          disabled={true}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Create room
        </Button>
      )}

      {rooms.length > 0 ? <h3>Join existing rooms</h3> : null}

      {username.length > 0
        ? rooms.map((room, index) =>
            !room.password ? (
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                key={index}
                onClick={() => joinRoom(room)}
              >
                Join {room.name}
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                key={index}
                onClick={() => joinLockedRoom(room)}
              >
                Join {room.name} {<LockIcon />}
              </Button>
            )
          )
        : rooms.map((room, index) =>
            !room.password ? (
              <Button
                disabled={true}
                className={classes.button}
                variant="contained"
                color="secondary"
                key={index}
                onClick={() => joinRoom(room)}
              >
                Join {room.name}
              </Button>
            ) : (
              <Button
                disabled={true}
                className={classes.button}
                variant="contained"
                color="secondary"
                key={index}
                onClick={() => joinLockedRoom(room)}
              >
                Join {room.name} {<LockIcon />}
              </Button>
            )
          )}
    </div>
  );
}

export default Rooms;

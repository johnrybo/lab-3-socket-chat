import "./App.css";
import React, { useContext, useState } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { TextField, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: '10vh',
    backgroundColor: 'aliceblue',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    margin: "1rem",
  },
  textField: {
    margin: "1rem",
  },
}));

const Aside = () => {
  const classes = useStyles();

  const { rooms, joinRoom, joinLockedRoom, getUsername, resetRoom } =
    useContext(ChatContext);

  const [changedUsername, setChangedUsername] = useState("");

  const emptyRoom = {
    name: undefined,
    password: undefined,
  };

  return (
    <div className={classes.container}>
      <Link className={classes.link} to={"/"}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => resetRoom(emptyRoom)}
        >
          Start
        </Button>
      </Link>
      <TextField
        className={classes.textField}
        variant="outlined"
        label="Username"
        onChange={(event) => setChangedUsername(event.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => getUsername(changedUsername)}
      >
        Change username
      </Button>

      {rooms.map((room, index) =>
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
      )}
    </div>
  );
};

export default Aside;

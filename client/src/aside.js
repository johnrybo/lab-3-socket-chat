import "./App.css";
import React, { useContext } from "react";
import { ChatContext } from "./context";
// import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core/";
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

  const { rooms, joinRoom, joinLockedRoom, resetRoom } =
    useContext(ChatContext);

  const emptyRoom = {
    name: "",
    password: "",
  };

  return (
    <div className={classes.container}>
      <a href="/" className={classes.link}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => resetRoom(emptyRoom)}
        >
          Rooms
        </Button>
      </a>

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

import "./App.css";
import React, { useState, useContext } from "react";
import { ChatContext } from "./context";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core/";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  button: {
    margin: "0.5rem",
    fontWeight: "bold",
  },
  text: {
    margin: "0.5rem",
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
  const [open, setOpen] = useState(false);
  const [password, setPassword2] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   joinLockedRoom(room, password)
  //   setOpen(false);
  // };

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
          type="password"
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

      {rooms.length > 0 ? (
        <Typography className={classes.text} variant="h6">
          Join existing rooms
        </Typography>
      ) : null}

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
              <div>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  key={index}
                  onClick={handleClickOpen}
                >
                  Join {room.name} {<LockIcon />}
                </Button>
                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Password</DialogTitle>
                  <DialogContent>
                    <TextField
                      onChange={(event) => setPassword2(event.target.value)}
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Password"
                      type="password"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        joinLockedRoom(room, password);
                        setOpen(false);
                      }}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
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

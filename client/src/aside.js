import "./App.css";
import React, { useContext, useState } from "react";
import { ChatContext } from "./context";
import LockIcon from "@material-ui/icons/Lock";
import { Button, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "10vh",
    backgroundColor: "#3f51b5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  link: {
    textDecoration: "none",
  },
  button: {
    margin: "1rem",
    backgroundColor: "aliceblue",
    fontWeight: "bold",
  },
  button2: {
    margin: "1rem",
    fontWeight: "bold",
  },
  textField: {
    margin: "1rem",
  },
}));

const Aside = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [password, setPassword2] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

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
          onClick={() => resetRoom(emptyRoom)}
        >
          Rooms
        </Button>
      </a>

      {rooms.map((room, index) =>
        !room.password ? (
          <Button
            className={classes.button2}
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
              className={classes.button2}
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
      )}
    </div>
  );
};

export default Aside;

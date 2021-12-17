import React, { useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import auth from "./../auth/auth-helper";
import { remove } from "./api-user.js";

const DeleteUser = ({ userId }) => {
  let [redirect, setRedirect] = useState(false);
  let [open, setOpen] = useState(false);

  const params = useParams();
  let isAuthenticated = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove(
      {
        userId: userId
      },
      { t: isAuthenticated.token }
    ).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        auth.signout(() => console.log("User deleted."));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Navigate replace to="/" />;
  }

  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={clickButton}
        color="secondary"
      >
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired
};

export default DeleteUser;

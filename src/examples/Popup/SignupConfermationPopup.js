import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";

export default function SignupConfermationPopup({ handleClose, detailData }) {
  return (
    <Dialog open={detailData !== null} handleclose={handleClose}>
      <DialogTitle>Signup Successfull</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          You have successfully signed up successfully.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

SignupConfermationPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  detailData: PropTypes.string.isRequired,
};

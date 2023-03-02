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

export default function EventsPopup({ handleClose, detailData }) {
  return (
    <Dialog open={detailData !== null} handleclose={handleClose}>
      <DialogTitle>Event Created Successfully</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          You have successfully Created Event - {detailData}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

EventsPopup.propTypes = {
  detailData: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

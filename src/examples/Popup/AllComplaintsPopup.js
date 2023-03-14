import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

import PropTypes from "prop-types";

export default function AllComplaintsPopup({ handleClose, detailData }) {
  return (
    <Dialog open={detailData !== null} onClose={handleClose}>
      <DialogTitle>Incident Details</DialogTitle>
      <DialogContent>
        <img
          src={detailData.image}
          alt="Incident"
          style={{
            width: "33rem",
            height: "15rem",
            border: "0.1rem solid black",
            borderRadius: "0.5rem",
          }}
        />
        <TextField fullWidth margin="normal" label="ID" value={detailData.id} disabled />
        <TextField
          fullWidth
          margin="normal"
          label="Incident"
          value={detailData.complaint}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reporter's Name"
          value={detailData.complainant}
          disabled
          multiline
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={detailData.description}
          disabled
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AllComplaintsPopup.propTypes = {
  detailData: PropTypes.shape({
    complaint: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    complainant: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

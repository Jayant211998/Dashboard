import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

import PropTypes from "prop-types";

export default function ComplaintPopup({ handleClose, detailData, assignees, handleAssign }) {
  const [assignedTo, setAssignedTo] = React.useState(null);

  const handleAssigneeChange = (event, value) => {
    setAssignedTo(value);
  };
  return (
    <Dialog open={detailData !== null} onClose={handleClose}>
      <DialogTitle>Incident Details</DialogTitle>
      <DialogContent>
        <img src={detailData.image} alt="Incident" />
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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={detailData.description}
          disabled
          multiline
        />
        <Autocomplete
          options={assignees}
          getOptionLabel={(option) => option}
          onChange={handleAssigneeChange}
          renderInput={(params) => <TextField {...params} label="Assign To" margin="normal" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={() => handleAssign(detailData.id, assignedTo)} color="primary">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ComplaintPopup.propTypes = {
  detailData: PropTypes.shape({
    complaint: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    complainant: PropTypes.string.isRequired,
  }).isRequired,
  assignees: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAssign: PropTypes.func.isRequired,
};

// assignees: PropTypes.arrayOf(
//   PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   })
// ).isRequired,

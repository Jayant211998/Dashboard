import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";

export default function ComplaintPopup({
  handleClose,
  detailData,
  assignees,
  handleAssign,
  handleReject,
}) {
  const [assignedTo, setAssignedTo] = React.useState("");
  const handleAssigneeChange = (event, value) => {
    setAssignedTo(value);
  };
  return (
    <Dialog open={detailData !== null} onClose={handleClose}>
      <DialogTitle>Incident Details</DialogTitle>
      <DialogContent>
        <img
          src={`data:image/png;base64,${detailData.complaintImage}`}
          alt="Incident"
          style={{
            width: "30rem",
            height: "15rem",
            border: "0.1rem solid black",
            borderRadius: "0.5rem",
            margin: "1rem",
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="ID"
          value={detailData.complaint.complaintId}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Incident"
          value={detailData.complaint.complaint.complaintName}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Complaint Department"
          value={detailData.complaint.complaint.department}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reporter's Name"
          value={detailData.complaint.userName}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reporter's Address"
          value={detailData.complaint.address}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={detailData.complaint.description}
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
        <Button
          onClick={() => handleAssign(detailData.complaint.complaintId, assignedTo)}
          color="primary"
        >
          Assign
        </Button>
        <Button onClick={() => handleReject(detailData.complaint.complaintId)} color="primary">
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ComplaintPopup.propTypes = {
  assignees: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAssign: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
  detailData: PropTypes.shape({
    complaint: PropTypes.shape({
      complaintId: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      complaint: PropTypes.shape({
        complaintName: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
      }),
    }).isRequired,
    complaintImage: PropTypes.string.isRequired,
  }).isRequired,
};

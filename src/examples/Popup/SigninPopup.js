import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";

function SigninPopup({ handleClose, requestData, handleSubmitOTP }) {
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const handleChange = (e) => {
    handleDateChange(e.target.value);
  };

  return (
    <Dialog open={requestData !== null} handleclose={handleClose}>
      <DialogTitle>Enter the OTP</DialogTitle>
      <DialogContent style={{ width: "30rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Mobile OTP"
              type="number"
              fullWidth
              value={selectedDate}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Have not recived OTP on your mobile?
            <Button>Resend OTP</Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={() => handleSubmitOTP(selectedDate)}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SigninPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSubmitOTP: PropTypes.func.isRequired,
  requestData: PropTypes.string.isRequired,
};

export default SigninPopup;

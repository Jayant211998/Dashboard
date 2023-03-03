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

export default function WaterSupplyPopup({ handleClose, detailData }) {
  return (
    <Dialog open={detailData !== null} handleclose={handleClose}>
      <DialogTitle>Change Made Successfully</DialogTitle>
      <DialogContent>
        <Typography gutterBottom variant="h5" component="div">
          {detailData.id}
        </Typography>
        {detailData.status === "off" ? (
          <Typography variant="body2" color="text.secondary">
            You have successfully Enabled the Water Supply in {detailData.colony_name}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            You have successfully Disabled the Water Supply in {detailData.colony_name}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

WaterSupplyPopup.propTypes = {
  detailData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    colony_name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

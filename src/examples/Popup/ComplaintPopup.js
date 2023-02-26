import React from "react";

import Modal from "components/Modals/Modals";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

export default function ComplaintPopup({ handleClose, detailData }) {
  return (
    <Modal>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {detailData.complaint}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {detailData.date}
          </Typography>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </CardContent>
      </Card>
    </Modal>
  );
}

ComplaintPopup.propTypes = {
  detailData: PropTypes.shape({
    complaint: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    // add more specific prop types for other properties if needed
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};
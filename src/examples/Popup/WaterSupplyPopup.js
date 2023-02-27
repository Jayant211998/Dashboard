import React from "react";

import Modal from "components/Modals/Modals";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";

export default function WaterSupplyPopup({ handleClose, detailData }) {
  return (
    <Modal>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
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
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </CardContent>
      </Card>
    </Modal>
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

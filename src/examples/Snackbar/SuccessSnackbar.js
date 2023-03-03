import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

function SuccessSnackbar({ text, handleClose }) {
  return (
    <Snackbar open={text !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" elevation={6} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  );
}

SuccessSnackbar.propTypes = {
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SuccessSnackbar;

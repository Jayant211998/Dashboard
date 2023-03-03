import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

function ErrorSnackbar({ text, handleClose }) {
  return (
    <Snackbar open={text !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" elevation={6} variant="filled">
        {text}
      </Alert>
    </Snackbar>
  );
}

ErrorSnackbar.propTypes = {
  text: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ErrorSnackbar;

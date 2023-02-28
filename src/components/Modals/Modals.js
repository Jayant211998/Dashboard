import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classes from "./Modal.module.css";

function BackDrop() {
  return <div className={classes.backdrop} />;
}

function ModalOverlay(props) {
  const { children } = props;
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

function Modal(props) {
  const { children } = props;
  return (
    <>
      {ReactDOM.createPortal(<BackDrop />, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;

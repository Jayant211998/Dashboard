import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@material-ui/core";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import traceAndThrow from "utils/Errors";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";

function ImgCard({ image, index, handleAddImage, handleRemoveImage }) {
  const [error, setError] = useState(false);
  const [errText, setErrText] = useState(false);
  const [imageSrc, setImageSrc] = useState(image);
  const [type, setType] = useState("base64");
  const btnref = useRef();

  function handleImageChange(event) {
    setType("url");
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
      handleAddImage(file);
    };
  }
  const handleEdit = () => {
    btnref.current.click();
  };
  const handleDelete = () => {
    handleRemoveImage(index);
    setImageSrc(null);
    const url = `https://api.rausmartcity.com/delete-user-slider/secure/${index}`;
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .delete(url, config)
      .then((response) => {
        console.log("Response from API:", response.data);
      })
      .catch((err) => {
        setError(true);
        setErrText(traceAndThrow(err));
      });
  };
  return (
    <div
      style={{
        backgroundImage:
          type === "url" ? `url(${imageSrc})` : `url(data:image/png;base64,${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "90%",
        height: "90%",
        margin: "2rem auto",
        border: "0.1rem solid black",
        borderRadius: "0.5rem",
        position: "relative",
      }}
    >
      <div>
        {imageSrc === null && (
          <Button
            type="button"
            onClick={handleEdit}
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Icon fontSize="small">upload</Icon>
          </Button>
        )}
        {imageSrc !== null && (
          <Button
            type="button"
            onClick={handleDelete}
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Icon fontSize="small">delete</Icon>
          </Button>
        )}
        <input
          id="image1-upload"
          type="file"
          ref={btnref}
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          style={{ display: "none" }}
        />
      </div>
      {error && (
        <ErrorSnackbar
          text={errText}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </div>
  );
}

ImgCard.propTypes = {
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleAddImage: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
};
export default ImgCard;

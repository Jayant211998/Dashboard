import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

function ImgCard({ image }) {
  const [imageSrc, setImageSrc] = useState(image);
  const btnref = useRef();

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageSrc(reader.result);
    };
  }
  const handleEdit = () => {
    btnref.current.click();
  };
  const handleDelete = () => {
    setImageSrc(null);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${imageSrc})`,
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
          <Icon fontSize="small">{imageSrc === null ? "upload" : "edit"}</Icon>
        </Button>
        {imageSrc !== null && (
          <Button
            type="button"
            onClick={handleDelete}
            style={{
              position: "absolute",
              right: "3rem",
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
    </div>
  );
}

ImgCard.propTypes = {
  image: PropTypes.string.isRequired,
};
export default ImgCard;

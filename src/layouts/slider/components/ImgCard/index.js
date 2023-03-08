import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Icon from "@mui/material/Icon";

function ImgCard() {
  const [imageSrc, setImageSrc] = useState(null);
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
      className="card"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "50rem",
        height: "20rem",
        margin: "2rem auto",
        border: "1px solid black",
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
export default ImgCard;

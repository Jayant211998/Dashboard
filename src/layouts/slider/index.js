import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import traceAndThrow from "utils/Errors";

import ImgCard from "./components/ImgCard";

function Slider() {
  const [error, setError] = useState(false);
  const [errText, setErrText] = useState(false);
  const [imgList, setImgList] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://api.rausmartcity.com/get-user-slider/secure", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        // handle successful response
        const images = response.data.body.map((img) => img.sliderImage);
        setImgList(images);
      })
      .catch((err) => {
        // handle error
        setError(true);
        setErrText(traceAndThrow(err));
      });
  }, [isSubmitted]);

  const handleSubmit = () => {
    const url = "https://api.rausmartcity.com/add-user-slider/secure";
    const formData = new FormData();
    formData.append("sliderImage", image);
    formData.append("title", "titleValue");
    formData.append("description", "descriptionValue");
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then(() => {
        setIsSubmitted(!isSubmitted);
      })
      .catch((err) => {
        setError(true);
        setErrText(traceAndThrow(err));
      });
  };

  const handleAddImage = (img) => {
    setImage(img);
  };

  const handleRemoveImage = (index) => {
    if (index > -1) {
      setImgList(imgList.splice(index, 1));
    }
  };

  const cards = imgList.map((img, id) => (
    <Card style={{ height: "25rem" }}>
      <ImgCard
        image={img}
        index={id}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
      />
    </Card>
  ));

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            {cards}
            {isSubmitted && (
              <Card style={{ height: "25rem" }}>
                <ImgCard
                  image={null}
                  index={-1}
                  handleAddImage={handleAddImage}
                  handleRemoveImage={handleRemoveImage}
                />
              </Card>
            )}
            {!isSubmitted && (
              <Card style={{ height: "25rem" }}>
                <ImgCard
                  image={null}
                  index={-1}
                  handleAddImage={handleAddImage}
                  handleRemoveImage={handleRemoveImage}
                />
              </Card>
            )}
          </Grid>
        </MDBox>
        <Button
          type="button"
          variant="contained"
          onClick={handleSubmit}
          style={{ color: "white", marginLeft: "1rem", width: "8rem" }}
        >
          Submit
        </Button>
      </DashboardLayout>
      {error && (
        <ErrorSnackbar
          text={errText}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
}

export default Slider;

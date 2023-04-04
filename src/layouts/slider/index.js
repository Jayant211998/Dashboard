import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import ImgCard from "./components/ImgCard";

function Slider() {
  const [imgList, setImgList] = React.useState([]);
  const [image, setImage] = React.useState(null);
  // const [newCard, setNewCard] = React.useState("inactive");
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
      .catch((error) => {
        // handle error
        console.error(error);
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
      .catch((error) => {
        console.error("Error from API:", error);
      });
  };

  const handleAddImage = (img) => {
    setImage(img);
  };

  const cards = imgList.map((img, id) => (
    <Card style={{ height: "25rem" }}>
      <ImgCard image={img} index={id} handleAddImage={handleAddImage} />
    </Card>
  ));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          {cards}
          {isSubmitted && (
            <Card style={{ height: "25rem" }}>
              <ImgCard image={null} handleAddImage={handleAddImage} />
            </Card>
          )}
          {!isSubmitted && (
            <Card style={{ height: "25rem" }}>
              <ImgCard image={null} handleAddImage={handleAddImage} />
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
  );
}

export default Slider;

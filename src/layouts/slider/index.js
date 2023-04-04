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
  }, []);

  const handleSubmit = () => {
    imgList.forEach((image) => {
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
        .then((response) => {
          console.log("Response from API:", response.data);
        })
        .catch((error) => {
          console.error("Error from API:", error);
        });
    });
  };

  const handleImage = (img, id) => {
    setImgList((prevList) => {
      const newList = prevList;
      newList[id] = img;
      return newList;
    });
  };

  const cards = imgList.map((img, id) => (
    <Card style={{ height: "25rem" }}>
      <ImgCard image={img} index={id} handleImage={handleImage} />
    </Card>
  ));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          {cards}
          <Card style={{ height: "25rem" }}>
            <ImgCard image={null} index={imgList.length} handleImage={handleImage} />
          </Card>
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

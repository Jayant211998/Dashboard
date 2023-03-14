import React from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import ImgCard from "./components/ImgCard";

function Slider() {
  const [imgList, setImgList] = React.useState([]);

  React.useEffect(() => {
    setImgList([
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    ]);
  }, []);

  const cards = imgList.map((img) => (
    <>
      <Card style={{ height: "25rem" }}>
        <ImgCard image={img} />
      </Card>
      <br />
    </>
  ));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          {cards}
          <Card style={{ height: "25rem" }}>
            <ImgCard image={null} />
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Slider;

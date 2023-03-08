import React from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import ImgCard from "./components/ImgCard";

function Slider() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={12}>
          <Card style={{ height: "25rem" }}>
            <ImgCard />
          </Card>
          <br />
          <Card style={{ height: "25rem" }}>
            <ImgCard />
          </Card>
          <br />
          <Card style={{ height: "25rem" }}>
            <ImgCard />
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Slider;

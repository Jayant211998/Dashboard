import React from "react";
// import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ImgCard from "./components/ImgCard";

function Slider() {
  return (
    <DashboardLayout>
      <h1>Upload Images</h1>
      <div className="card-container">
        <ImgCard />
        <ImgCard />
        <ImgCard />
      </div>
    </DashboardLayout>
  );
}

export default Slider;

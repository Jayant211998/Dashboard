import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import birthcertificate from "layouts/tables/data/birthcertificate";
import deathCertificate from "layouts/tables/data/deathcertificate";

import DeathRequestPopup from "../../examples/Popup/DeathRequestPopup";
import BirthRequestPopup from "../../examples/Popup/BirthRequestPopup";

function Tables() {
  const [showBirthDetails, setShowBirthDetails] = useState(false);
  const [showDeathDetails, setShowDeathDetails] = useState(false);
  const [birthDetailData, setBirthDetailData] = useState({});
  const [deathDetailData, setDeathDetailData] = useState({});

  const handleBirthClick = (e, Data) => {
    e.preventDefault();
    setShowBirthDetails(true);
    setBirthDetailData(Data);
  };
  const handleDeathClick = (e, Data) => {
    e.preventDefault();
    setShowDeathDetails(true);
    setDeathDetailData(Data);
  };
  const handleCloseBirth = () => {
    setShowBirthDetails(false);
  };
  const handleCloseDeath = () => {
    setShowDeathDetails(false);
  };
  const handleBirthSchedule = () => {
    console.log("Appointment Scheduled for Birth Certificate");
    handleCloseBirth();
  };
  const handleDeathSchedule = () => {
    console.log("Appointment Scheduled for Death Certificate");
    handleCloseDeath();
  };

  const { columns, rows } = birthcertificate(handleBirthClick);
  const { columns: pColumns, rows: pRows } = deathCertificate(handleDeathClick);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Birth Certificate Request
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Death Certificate Request
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      {showBirthDetails && (
        <BirthRequestPopup
          requestData={birthDetailData}
          handleclose={handleCloseBirth}
          handleSchedule={handleBirthSchedule}
        />
      )}
      {showDeathDetails && (
        <DeathRequestPopup
          requestData={deathDetailData}
          handleclose={handleCloseDeath}
          handleSchedule={handleDeathSchedule}
        />
      )}
    </>
  );
}

export default Tables;

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
import birthcertificate from "layouts/requests/data/birthcertificate";
import deathCertificate from "layouts/requests/data/deathcertificate";

import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import SuccessSnackbar from "examples/Snackbar/SuccessSnackbar";
import DeathRequestPopup from "../../examples/Popup/DeathRequestPopup";
import BirthRequestPopup from "../../examples/Popup/BirthRequestPopup";

function Requests() {
  const [showBirthDetails, setShowBirthDetails] = useState(false);
  const [showDeathDetails, setShowDeathDetails] = useState(false);
  const [birthDetailData, setBirthDetailData] = useState({});
  const [deathDetailData, setDeathDetailData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

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
  const handleBirthSchedule = (id, date) => {
    if (date === "") {
      setError(true);
      setText("Please set date to Schedule Appointment.");
    } else {
      setSuccess(true);
      setText("Appointment set Successfully.");
      setShowBirthDetails(false);
      console.log(id, date);
      handleCloseBirth();
      // Backend update id and set date
    }
  };
  const handleDeathSchedule = (id, date) => {
    if (date === "") {
      setError(true);
      setText("Please set date to Schedule Appointment.");
    } else {
      setSuccess(true);
      setText("Appointment set Successfully.");
      setShowDeathDetails(false);
      console.log(id, date);
      handleCloseDeath();
      // Backend update id and set date
    }
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
          handleClose={handleCloseBirth}
          handleSchedule={handleBirthSchedule}
        />
      )}
      {showDeathDetails && (
        <DeathRequestPopup
          requestData={deathDetailData}
          handleClose={handleCloseDeath}
          handleSchedule={handleDeathSchedule}
        />
      )}
      {error && (
        <ErrorSnackbar
          text={text}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
      {success && (
        <SuccessSnackbar
          text={text}
          handleClose={() => {
            setSuccess(false);
          }}
        />
      )}
    </>
  );
}

export default Requests;

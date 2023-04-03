import { useState, useEffect, useLayoutEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
import breakpoints from "assets/theme/base/breakpoints";

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
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

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
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [bRow, setBRows] = useState([]);
  const [dRow, setDRows] = useState([]);
  const [bColumn, setBColumn] = useState([]);
  const [dColumn, setDColumn] = useState([]);

  useLayoutEffect(() => {
    async function getData() {
      const bData = await birthcertificate(handleBirthClick, tabValue);
      const dData = await deathCertificate(handleDeathClick, tabValue);
      console.log(dData);
      setBRows(bData.rows);
      setDRows(dData.pRows);
      setBColumn(bData.columns);
      setDColumn(dData.pColumns);
    }
    getData();
    // console.log(bRow, dRow);
  }, [tabValue]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Pending" />
                <Tab label="Scheduled" />
                <Tab label="Resolved" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
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
                    table={{ columns: bColumn, rows: bRow }}
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
                    table={{ columns: dColumn, rows: dRow }}
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

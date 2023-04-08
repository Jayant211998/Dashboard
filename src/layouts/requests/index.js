import { useState, useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

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
// import birthcertificate from "layouts/requests/data/birthcertificate";
// import deathCertificate from "layouts/requests/data/deathcertificate";
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
  const [responseData, setResponseData] = useState([]);

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
  const handleResolved = (id) => {
    axios
      .patch(
        `https://api.rausmartcity.com/update-user-requests/secure/${id}`,
        {
          requestStatus: "Resolved",
        },
        {
          // Request headers
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSuccess(true);
        setText("Request Resolved.");
        setShowBirthDetails(false);
        setShowDeathDetails(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSchedule = (id, date) => {
    if (date === "") {
      setError(true);
      setText("Please set date to Schedule Appointment.");
    } else {
      // Backend update id and set date
      axios
        .patch(
          `https://api.rausmartcity.com/update-user-requests/secure/${id}`,
          {
            documentVerificationDate: date.toString(),
            requestStatus: "Scheduled",
          },
          {
            // Request headers
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSuccess(true);
          setText("Appointment set Successfully.");
          setShowBirthDetails(false);
          setShowDeathDetails(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [bRow, setBRows] = useState([]);
  const [dRow, setDRows] = useState([]);
  const [bColumn, setBColumn] = useState([]);
  const [dColumn, setDColumn] = useState([]);

  function birthcertificate(handleClick, value, response) {
    if (response.status === 200 || response.status === 201) {
      const tableData = response.data.body.filter(
        (req) =>
          req.reuestData.requestType === "birthCertificate" &&
          ((value === 0 && req.reuestData.requestStatus === "Pending") ||
            (value === 1 && req.reuestData.requestStatus === "Scheduled") ||
            (value === 2 && req.reuestData.requestStatus === "Resolved"))
      );
      const TableContent = tableData.map((compData) => ({
        requestId: compData.reuestData.requestId,
        requester: compData.reuestData.userName,
        status: compData.reuestData.requestStatus,
        date: compData.reuestData.createdAt.split("T")[0],
        details: (
          <button
            type="button"
            style={{ border: "none", background: "transparent" }}
            onClick={(e) => {
              handleClick(e, compData);
            }}
          >
            Details
          </button>
        ),
      }));
      return TableContent;
    }
    return [];
  }
  function deathCertificate(handleClick, value, response) {
    if (response.status === 200 || response.status === 201) {
      const tableData = response.data.body.filter(
        (req) =>
          req.reuestData.requestType === "deathCertificate" &&
          ((value === 0 && req.reuestData.requestStatus === "Pending") ||
            (value === 1 && req.reuestData.requestStatus === "Scheduled") ||
            (value === 2 && req.reuestData.requestStatus === "Resolved"))
      );
      const TableContent = tableData.map((compData) => ({
        requestId: compData.reuestData.requestId,
        requester: compData.reuestData.userName,
        status: compData.reuestData.requestStatus,
        date: compData.reuestData.createdAt.split("T")[0],
        details: (
          <button
            type="button"
            style={{ border: "none", background: "transparent" }}
            onClick={(e) => {
              handleClick(e, compData);
            }}
          >
            Details
          </button>
        ),
      }));
      return TableContent;
    }
    return [];
  }

  useEffect(() => {
    function getapi() {
      axios
        .get("https://api.rausmartcity.com/get-all-user-requests/secure?page=3", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setResponseData(response);
          const bData = birthcertificate(handleBirthClick, tabValue, response);
          const dData = deathCertificate(handleDeathClick, tabValue, response);
          setBRows(bData);
          setDRows(dData);
          setBColumn([
            { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
            { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
            { Header: "Date of Request", accessor: "date", align: "center" },
            { Header: "Status", accessor: "status", align: "center" },
            { Header: "See Details", accessor: "details", align: "center" },
          ]);
          setDColumn([
            { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
            { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
            { Header: "Date of Request", accessor: "date", align: "center" },
            { Header: "Status", accessor: "status", align: "center" },
            { Header: "See Details", accessor: "details", align: "center" },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getapi();
  }, []);
  useLayoutEffect(() => {
    const bData = birthcertificate(handleBirthClick, tabValue, responseData);
    const dData = deathCertificate(handleDeathClick, tabValue, responseData);
    setBRows(bData);
    setDRows(dData);
    setBColumn([
      { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
      { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
      { Header: "Date of Request", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ]);
    setDColumn([
      { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
      { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
      { Header: "Date of Request", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ]);
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
          handleSchedule={handleSchedule}
          handleResolved={handleResolved}
        />
      )}
      {showDeathDetails && (
        <DeathRequestPopup
          requestData={deathDetailData}
          handleClose={handleCloseDeath}
          handleSchedule={handleSchedule}
          handleResolved={handleResolved}
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

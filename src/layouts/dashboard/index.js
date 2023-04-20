import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import traceAndThrow from "utils/Errors";

function Dashboard() {
  const [error, setError] = useState(false);
  const [errText, setErrText] = useState(false);
  const [complaint, setComplaint] = useState(0);
  const [request, setRequest] = useState(0);
  const [waterFlow, setwaterFlow] = useState(0);
  const [events, setEvents] = useState(0);
  const [newComplaint, setNewComplaint] = useState(0);
  const [newRequest, setNewRequest] = useState(0);
  const [newWaterFlow, setNewWaterFlow] = useState(0);
  const [newEvents, setNewEvents] = useState(0);

  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://api.rausmartcity.com/get-all-user-complaints/secure", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          const data = response.data.body;
          setComplaint(data.length);
          const data1 = data.filter((comp) => comp.complaint.complaintStatus === "Pending");
          setNewComplaint(data1.length);
        })
        .catch((err) => {
          setError(true);
          setErrText(traceAndThrow(err));
        });

      axios
        .get("https://api.rausmartcity.com/get-all-user-requests/secure", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          const data = response.data.body;
          setRequest(data.length);
          const data1 = data.filter((req) => req.requestData.requestStatus === "Pending");
          setNewRequest(data1.length);
        })
        .catch((err) => {
          setError(true);
          setErrText(traceAndThrow(err));
        });

      axios
        .get("https://api.rausmartcity.com/get-events/secure", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          const data = response.data.body;
          setEvents(data.length);
          const data1 = data.filter((event) => {
            const createdDate = new Date(event.eventData.createdAt);
            const currentDate = new Date();
            return (
              createdDate.getDate() === currentDate.getDate() &&
              createdDate.getMonth() === currentDate.getMonth() &&
              createdDate.getFullYear() === currentDate.getFullYear()
            );
          });
          setNewEvents(data1.length);
        })
        .catch((err) => {
          setError(true);
          setErrText(traceAndThrow(err));
        });
    };
    getData();
    setwaterFlow(0);
    setNewWaterFlow(0);
  }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="description"
                  title="Complaints"
                  count={complaint}
                  route="/complaints"
                  percentage={{
                    color: "success",
                    amount: newComplaint,
                    label: "In this week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="receipt_long"
                  title="request"
                  count={request}
                  route="/request"
                  percentage={{
                    color: "success",
                    amount: newRequest,
                    label: "In this week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="local_drink"
                  title="Water Supply"
                  count={waterFlow}
                  route="/watersupply"
                  percentage={{
                    color: "success",
                    amount: newWaterFlow,
                    label: "In this week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="diversity_3"
                  title="Events"
                  count={events}
                  route="/events"
                  percentage={{
                    color: "success",
                    amount: newEvents,
                    label: "recently created",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <Projects />
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
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

export default Dashboard;

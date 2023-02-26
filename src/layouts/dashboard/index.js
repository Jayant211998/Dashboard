import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

function Dashboard() {
  const [complaint, setComplaint] = useState(0);
  const [request, setRequest] = useState(0);
  const [waterFlow, setwaterFlow] = useState(0);
  const [events, setEvents] = useState(0);
  const [newComplaint, setNewComplaint] = useState(0);
  const [newRequest, setNewRequest] = useState(0);
  const [newWaterFlow, setNewWaterFlow] = useState(0);
  const [newEvents, setNewEvents] = useState(0);

  useEffect(() => {
    setComplaint(281);
    setNewComplaint(10);
    setRequest(2300);
    setNewRequest(3);
    setwaterFlow(34000);
    setNewWaterFlow(15);
    setEvents(91);
    setNewEvents(1);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Complaints"
                count={complaint}
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
                icon="leaderboard"
                title="Requests"
                count={request}
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
                color="success"
                icon="store"
                title="Water Supply"
                count={waterFlow}
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
                icon="person_add"
                title="Events"
                count={events}
                percentage={{
                  color: "success",
                  amount: newEvents,
                  label: "In this week",
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
  );
}

export default Dashboard;

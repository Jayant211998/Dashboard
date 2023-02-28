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
import rejectedComplaintData from "layouts/complaints/data/rejectedComplaint";
import resolvedComplaintData from "layouts/complaints/data/resolvedComplaint";

import AllComplaintsPopup from "../../examples/Popup/AllComplaintsPopup";

function Complaints() {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState({});

  const handleClick = (e, complaintData) => {
    e.preventDefault();
    setShowDetails(true);
    setDetailData(complaintData);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const { columns, rows } = rejectedComplaintData(handleClick);
  const { columns: pColumns, rows: pRows } = resolvedComplaintData(handleClick);

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
                    Resolved Complaints
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
                    Rejected Complaints
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
      {showDetails && <AllComplaintsPopup detailData={detailData} handleClose={handleClose} />}
    </>
  );
}

export default Complaints;

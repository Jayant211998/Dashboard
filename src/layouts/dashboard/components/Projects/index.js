import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
// Data
import data from "layouts/dashboard/components/Projects/data";
import data1 from "layouts/dashboard/components/Projects/data/data.json";
import ComplaintPopup from "../../../../examples/Popup/ComplaintPopup";

function Projects() {
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

  const { columns, rows, assignees, tableData } = data(handleClick);

  const [incidentData, setIncidentData] = useState(tableData);

  const handleAssign = (id, name) => {
    const newData = incidentData.map((incident) => {
      if (incident.id === id) {
        return { ...incident, assignedTo: name };
      }
      return incident;
    });
    setIncidentData(newData);
    setShowDetails(false);
  };
  // console.log(incidentData);

  return (
    <>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Complaint
            </MDTypography>
            <MDBox display="flex" alignItems="center" lineHeight={0}>
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { info } }) => info.main,
                  mt: -0.5,
                }}
              >
                done
              </Icon>
              <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;<strong>Total Complaints {data1.totalcomplaints}</strong>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        </MDBox>
      </Card>
      {showDetails && (
        <ComplaintPopup
          detailData={detailData}
          handleClose={handleClose}
          assignees={assignees}
          handleAssign={handleAssign}
        />
      )}
    </>
  );
}

export default Projects;

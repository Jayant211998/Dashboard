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
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import SuccessSnackbar from "examples/Snackbar/SuccessSnackbar";
import ComplaintPopup from "../../../../examples/Popup/ComplaintPopup";

function Projects() {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const handleClick = (e, complaintData) => {
    e.preventDefault();
    setShowDetails(true);
    setDetailData(complaintData);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const { columns, rows, assignees } = data(handleClick);

  const handleAssign = (id, name) => {
    if (name === "") {
      setError(true);
      setText("Complaint is not assigned as name was not provided.");
    } else {
      setSuccess(true);
      setText("Complaint is assigned Successfully.");
      console.log(id, name);
      setShowDetails(false);
      handleClose();
      // Backend update name to particular id on backend
    }
  };

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

export default Projects;

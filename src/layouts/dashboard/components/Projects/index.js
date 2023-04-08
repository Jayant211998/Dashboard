import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
// Data
import data from "layouts/dashboard/components/Projects/data";
import SuccessSnackbar from "examples/Snackbar/SuccessSnackbar";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import traceAndThrow from "utils/Errors";
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
      axios
        .patch(
          `https://api.rausmartcity.com/update-user-complaints/secure/${id}`,
          {
            assignedTo: name,
            complaintStatus: "Resolved",
          },
          {
            // Request headers
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setSuccess(true);
          setText("Complaint is assigned Successfully.");
          setShowDetails(false);
          handleClose();
        })
        .catch((err) => {
          setError(true);
          setText(traceAndThrow(err));
        });
      // Backend update name to particular id on backend
    }
  };

  const handleReject = (id) => {
    axios
      .patch(
        `https://api.rausmartcity.com/update-user-complaints/secure/${id}`,
        {
          complaintStatus: "Rejected",
        },
        {
          // Request headers
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setSuccess(true);
        setText("Complaint is Rejected Successfully.");
        setShowDetails(false);
        handleClose();
      })
      .catch((err) => {
        setError(true);
        setText(traceAndThrow(err));
      });
    // Backend update name to particular id on backend
  };

  return (
    <>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Complaint
            </MDTypography>
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
          handleReject={handleReject}
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

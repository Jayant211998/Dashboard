import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import SupplyTable from "examples/Tables/SupplyTable";
// Data
import data from "layouts/watersupply/components/Supply/data";
import WaterSupplyPopup from "../../../../examples/Popup/WaterSupplyPopup";

function Supply() {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState({});

  const handleClick = (supplyData) => {
    setShowDetails(true);
    setDetailData(supplyData);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const { columns, rows } = data(handleClick);

  return (
    <>
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Water Supply
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox>
          <SupplyTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        </MDBox>
      </Card>
      {showDetails && <WaterSupplyPopup detailData={detailData} handleClose={handleClose} />}
    </>
  );
}

export default Supply;

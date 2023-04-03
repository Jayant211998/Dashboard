import React from "react";
// import resolvedComplaintData from "./data.json";
import Cookies from "js-cookie";
import axios from "axios";

export default function data(handleClick) {
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      axios
        .get("https://api.rausmartcity.com/get-all-user-complaints/secure?$page=1", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.body);
          setTableData(response.data.body);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const TableContent = tableData.map((compData) => ({
    complaint: compData.complaint.complaint.complaintName,
    complainant: compData.complaint.userName,
    date: compData.complaint.createdAt.split("T")[0],
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

  return {
    columns: [
      { Header: "Complaint", accessor: "complaint", width: "45%", align: "left" },
      { Header: "Complainant Name", accessor: "complainant", width: "20%", align: "left" },
      { Header: "Date of complaint", accessor: "date", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ],

    rows: TableContent,
  };
}

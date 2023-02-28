import React from "react";
import rejectedComplaintData from "./data.json";

export default function data(handleClick) {
  const [tableData, setTableData] = React.useState([]);

  React.useState(() => {
    setTableData(rejectedComplaintData.data);
  }, []);

  const TableContent = tableData.map((compData) => ({
    complaint: compData.complaint,
    complainant: compData.complainant,
    date: compData.date,
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

import React from "react";
import deathRequestData from "./deathData.json";

export default function deathCertificate(handleClick) {
  const [tableData, setTableData] = React.useState([]);

  React.useState(() => {
    setTableData(deathRequestData.data);
  }, []);

  const TableContent = tableData.map((compData) => ({
    requestId: compData.requestId,
    requester: compData.name,
    status: compData.status,
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
      { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
      { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
      { Header: "Date of Request", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ],

    rows: TableContent,
  };
}

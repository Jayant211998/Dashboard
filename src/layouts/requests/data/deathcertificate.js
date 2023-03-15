import React from "react";
import deathRequestData from "./deathData.json";
import deathRequestDataResolved from "./deathDataResolved.json";
import deathRequestDataScheduled from "./deathDataScheduled.json";

export default function deathCertificate(handleClick, value) {
  let tableData = [];
  if (value === 0) {
    tableData = deathRequestData.data;
  } else if (value === 1) {
    tableData = deathRequestDataScheduled.data;
  } else {
    tableData = deathRequestDataResolved.data;
  }

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
    pColumns: [
      { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
      { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
      { Header: "Date of Request", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ],

    pRows: TableContent,
  };
}

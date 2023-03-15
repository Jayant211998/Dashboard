import React from "react";
import birthRequestData from "./birthData.json";
import birthRequestDataResoved from "./birthDataResolved.json";
import birthRequestDataScheduled from "./birthDataScheduled.json";

export default function birthcertificate(handleClick, value) {
  let tableData = [];

  if (value === 0) {
    tableData = birthRequestData.data;
  } else if (value === 1) {
    tableData = birthRequestDataScheduled.data;
  } else {
    tableData = birthRequestDataResoved.data;
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

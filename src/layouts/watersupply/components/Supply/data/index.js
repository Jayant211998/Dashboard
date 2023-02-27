import React from "react";
import { Switch } from "@material-ui/core";
import supplyData from "./data.json";

export default function data(handleClick) {
  const [tableData, setTableData] = React.useState([]);

  React.useState(() => {
    setTableData(supplyData.data);
  }, [tableData]);

  const handleSwitch = (watersupplyData) => {
    const { id } = watersupplyData;
    const updatedData = tableData.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: watersupplyData.status === "on" ? "off" : "on" };
      }
      return obj;
    });
    setTableData(updatedData);
    handleClick(watersupplyData);
  };

  const TableContent = tableData.map((watersupplyData) => ({
    id: watersupplyData.id,
    colony_name: watersupplyData.colony_name,
    status: (
      <Switch
        checked={watersupplyData.status === "on"}
        onChange={() => handleSwitch(watersupplyData)}
      />
    ),
  }));

  return {
    columns: [
      { Header: "ID", accessor: "id", width: "15%", align: "left" },
      { Header: "Colony Name", accessor: "colony_name", width: "50%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
    ],

    rows: TableContent,
  };
}

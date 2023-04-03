import Cookies from "js-cookie";
import axios from "axios";

export default async function birthcertificate(handleClick, value) {
  const response = await axios.get(
    "https://api.rausmartcity.com/get-all-user-requests/secure?page=1",
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status === 200 || response.status === 201) {
    const tableData = response.data.body.filter(
      (data) =>
        data.reuestData.requestType === "birthCertificate" &&
        ((value === 0 && data.reuestData.requestStatus === "Pending") ||
          (value === 1 && data.reuestData.requestStatus === "Scheduled") ||
          (value === 2 && data.reuestData.requestStatus === "Resolved"))
    );
    const TableContent = tableData.map((compData) => ({
      requestId: compData.reuestData.requestId,
      requester: compData.reuestData.userName,
      status: compData.reuestData.requestStatus,
      date: compData.reuestData.createdAt.split("T")[0],
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
  return {
    columns: [
      { Header: "Request Id", accessor: "requestId", width: "20%", align: "left" },
      { Header: "Requester Name", accessor: "requester", width: "20%", align: "left" },
      { Header: "Date of Request", accessor: "date", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "See Details", accessor: "details", align: "center" },
    ],

    rows: [],
  };
}

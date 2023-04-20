import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import EventCard from "examples/Cards/EventCard";
import EventDetailsPopup from "examples/Popup/EventDetailsPopup";

import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import traceAndThrow from "../../utils/Errors";

export default function ShowEvents() {
  const [data, setData] = useState(false);
  const [eventData, setEventData] = useState({ data: {}, img: "" });
  const [error, setError] = useState(false);
  const [text, setText] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (dataById, imageById) => {
    setOpen(true);
    setEventData({ data: dataById, img: imageById });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("https://api.rausmartcity.com/get-events/secure", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          setData(response.data.body);
        })
        .catch((err) => {
          setError(true);
          setText(traceAndThrow(err));
        });
    };
    getData();
  }, []);
  const cards = data ? (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
      {data.map((d) => (
        <EventCard
          key={d.eventData.eventId}
          image={d.eventImages[0]}
          data={d.eventData}
          handleClick={handleClick}
        />
      ))}
    </div>
  ) : (
    []
  );
  return (
    <>
      {data && cards}
      {error && (
        <ErrorSnackbar
          text={text}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
      {open && <EventDetailsPopup handleClose={handleClose} requestData={eventData} />}
    </>
  );
}

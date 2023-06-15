import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents").then((response) => {
      setEvents(response.data);
    });
  }, []);
  return (
    <>
      <div className="event-header">
        <div className="page-title">
          <h1>EVENTS</h1>
        </div>
        <div className="create-event">
          <input type="text" placeholder="Search"></input>
          <Link to="/create-events">
            <button>+ Create</button>
          </Link>
        </div>
      </div>
      <div className="event-display">
        {events &&
          events.map((event) => (
            <>
              <div key={event._id} className="event-details">
                <div className="event-photo">
                  <p>Photo</p>
                </div>
                <div className="event-info">
                  <h1>{event.title}</h1>
                  <p id="event-date">{event.date}</p>
                  <p id="event-location">{event.location}</p>
                  <p>from ${event.price}</p>
                </div>
              </div>
              <br></br>
            </>
          ))}
      </div>
    </>
  );
}

export default Dashboard;
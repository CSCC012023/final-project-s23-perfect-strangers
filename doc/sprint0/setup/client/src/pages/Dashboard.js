import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import eventStyles from "../styles/event.module.css";


function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents").then((response) => {
      setEvents(response.data);
    });
  }, []);
  return (

    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>
          EVENTS
        </div>
        <div className={styles.smallDivision}>
          <div className={styles.verticalContent}>
            <input 
              type="text" 
              placeholder="Search"
              className={styles.inputMin}>
            </input>
            <Link 
              to="/create-events">
              <button className={styles.purpleButton}>
                + Create
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.wrapContainer}>
        {events &&
          events.map((event) => (
            <>
              <div style={{margin: "10px"}}>
              <div key={event._id} className={eventStyles.eventDetails}>
                <div className={eventStyles.eventPhoto}>
                  <p>Photo</p>
                </div>
                <div className={styles.verticalContent}>
                  <h1 className={styles.boldtext}>{event.title}</h1>
                  <p className={styles.smalltext}>{event.date}</p>
                  <p className={styles.smalltext}>{event.location}</p>
                  <p className={styles.smalltext}>from ${event.price}</p>

                </div>
              </div>
              </div>
              
              <br></br>
            </>
          ))}
      </div>

    </div>

  );
}

export default Dashboard;

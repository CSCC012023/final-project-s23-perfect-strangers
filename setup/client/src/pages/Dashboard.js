import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import EventItem from "./EventItem";
import EventsFilter from "./EventsFilter";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // DEV-CGP-9
  const [selectedTags, setSelectedTags] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);

  useEffect(() => {
    /* Get event tags from local storage if any */
    const localTags = localStorage.getItem("tags");
    if (localTags !== null)
      setSelectedTags(JSON.parse(localTags));

    /* Get events list while accounting for query tags if any */
    getEventsList(false);
  }, []);

  const getEventsList = (placeHolder) => {
    const localTags = localStorage.getItem("tags");

    if (localTags !== null && JSON.parse(localTags).length !== 0){
      // Gets events according to query tags
      Axios.post("http://localhost:5000/api/tags/userevents/", {queryTags: JSON.parse(localTags) })
      .then((response) => {
        setEvents(response.data);
      })
    }
    else{
      // Gets all events
      Axios.get("http://localhost:5000/api/userevents").then((response) => {
        setEvents(response.data);
      })
    }

    setPopupTrigger(placeHolder); // Closes the popup
  }

  return (
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>
          EVENTS
        </div>

        <div className={styles.smallDivision}>
          <div className={styles.verticalContent}>

            <input type="text" placeholder="Search" className={styles.inputMin}> 
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

      {/* DEV-CGP-9 */}
      <div className={styles.Division}>
        <div className={styles.horizontalContent}>
          <EventsFilter 
            selectedTags={selectedTags} setSelectedTags={setSelectedTags} getEventsList={getEventsList}
            popupTrigger={popupTrigger} setPopupTrigger={getEventsList}       
          />
        </div>
      </div>

      <div className={styles.wrapContainer}>
        {events &&
          events.map((event) => (
            <div key={event._id} style={{margin: "10px"}}>
              <EventItem event={event} />
            </div>
          ))}

         { // DEV-CGP-9
            (selectedTags.length !== 0 && events.length === 0) && (
              <div className={styles.largeMessage}>
                No Events Found matching those filters!
              </div>
            )
         }
      </div>

    </div>

  );
}

export default Dashboard;

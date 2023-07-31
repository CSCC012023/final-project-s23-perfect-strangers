import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import EventItem from "./EventItem";
import Popup from "../CommonItems/Popup";

import jwtDecode from "jwt-decode";

import EventsFilter from "./EventsFilter";
import EventPopupContent from "./EventPopupContent";
import StatelessPopup from "../CommonItems/StatelessPopup";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // DEV-CGP-9
  const [selectedTags, setSelectedTags] = useState([]);
  const [popupTrigger, setPopupTrigger] = useState(false);
  const token = jwtDecode(localStorage.getItem("token"));

  /***************** DEV-CGP-6 *******************/
  useEffect(() => {
      if (!localStorage.getItem("token")){
          const userEmail = window.location.href.split('=')[1].split("#")[0];
          Axios.get("http://localhost:5000/login/token/" + userEmail)
          .then((res) => {
              localStorage.setItem("token", res.data.token);
          });
      }
  }, []);
  
  useEffect(() => {
    /* Get event tags from local storage if any */
    const localTags = localStorage.getItem("tags");
    if (localTags !== null) setSelectedTags(JSON.parse(localTags));

    getEventsList(false); // Get events list accounting for query tags
  }, []);

  const getEventsList = placeHolder => {
    const localTags = localStorage.getItem("tags");

    if (localTags !== null && JSON.parse(localTags).length !== 0) {
      // Gets events according to query tags
      Axios.post("http://localhost:5000/api/tags/userevents/", {
        queryTags: JSON.parse(localTags),
      }).then(response => {
        setEvents(response.data);
        console.log(response.data);
      });
    } else {
      Axios.get("http://localhost:5000/api/userevents").then(response => {
        setEvents(response.data);
        console.log(response.data);
      });
    }
    setPopupTrigger(placeHolder); // Closes the popup
  };

  //DEV-CGP-23: refactoring popup into a single component instead of separate popups for each event
  const [eventSelected, setEventSelected] = useState(null);
  const [eventExpand, setEventExpand] = useState(false);

  const openPopup = event => {
    setEventSelected(event);
    setEventExpand(true);
  };

  return (
    <>
      <StatelessPopup trigger={eventExpand} setTrigger={setEventExpand}>
        <EventPopupContent
          userid={token.id}
          event={eventSelected}
          close={() => setEventExpand(false)}
        />
      </StatelessPopup>

      <div className={styles.rightContainer}>
        <div className={styles.horizontalContent}>
          <div className={styles.squishHeading}>EVENTS</div>

          <div className={styles.smallDivision}>
            <div className={styles.verticalContent}>
              <input
                type="text"
                placeholder="Search"
                className={styles.inputMin}
              ></input>

              <Link to="/create-events">
                <button className={styles.purpleButton}>+ Create</button>
              </Link>
            </div>
          </div>
        </div>

        {/* DEV-CGP-9 */}
        <div className={styles.Division}>
          <div className={styles.horizontalContent} style={{ marginLeft: 10 }}>
            <EventsFilter
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              getEventsList={getEventsList}
              popupTrigger={popupTrigger}
              setPopupTrigger={getEventsList}
            />
          </div>
        </div>

        <div className={styles.wrapContainer}>
          {events &&
            events.map(event => (
              <div
                key={event._id}
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => openPopup(event)}
              >
                <EventItem event={event} />
              </div>
            ))}

          {
            // DEV-CGP-9
            selectedTags.length !== 0 && events.length === 0 && (
              <div className={styles.largeMessage}>
                No Events Found matching those filters!
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Dashboard;

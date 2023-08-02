import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

import styles from "../styles/common_styles.module.css";
import EventItem from "./EventItem";
import Popup from "../CommonItems/Popup";

import jwtDecode from "jwt-decode";

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

    getEventsList(false); // Get events list accounting for query tags
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
      Axios.get("http://localhost:5000/api/userevents").then((response) => {
        setEvents(response.data);
      })
    }
    setPopupTrigger(placeHolder); // Closes the popup
  }

  const Content = (event, close) => {
    const token = jwtDecode(localStorage.getItem("token"));

    const [processed, setProcessed] = useState(false);
    const [processedMessage, setProcessedMessage] = useState("test");

    const makeRequest = () => {
      Axios.post("http://localhost:5000/requests/", {
          requester: token.id,
          event: event._id,
      }).then(res => {
          setProcessed(true);
          setProcessedMessage(res.data.msg);

          // Update numRequests for specific event in db only if the request does not already exist
          if (!res.data.exists){
            Axios.post("http://localhost:5000/api/userevents/numRequests", {
            _id: event._id,
            numRequests: event.numRequests + 1,
            }).then((response) => {
              console.log(response);
            })
            .catch((err) => console.log(err));
          }
      });
    };

    return (
      <>
        {token.id === event.creator ? (
          <div className={styles.text}>this is your event</div>
        ) : processed ? (
          <div className={styles.text}>{processedMessage}</div>
        ) : (
          <>
            <div className={styles.flexWrappableText}>
              Would you like to send a request to attend this
              event?
            </div>
            <button
              className={styles.smallTransparentButton}
              onClick={makeRequest}
            >
              make a request
            </button>
          </>
        )}
      </>
    );
  };

  const PopularEvents = () => {
    const getNumRequests = (event) => event.numRequests;

    const popularEventsList = [];

    events.forEach((event) => {
      if (popularEventsList.length < 6) {
        popularEventsList.push(event);
      } else {
        const mostPopularEvent = popularEventsList.reduce((min, current) => (getNumRequests(min) < getNumRequests(current) ? min : current));
        if (getNumRequests(event) > getNumRequests(mostPopularEvent)) {
          popularEventsList.splice(popularEventsList.indexOf(mostPopularEvent), 1, event);
        }
      }
    });

    popularEventsList.sort((event1, event2) => event2.numRequests - event1.numRequests);
    const remainingEvents = events.filter(event => !popularEventsList.includes(event));

    return (
      <>
        <div className={styles.wrapContainer}>
          {popularEventsList &&
            popularEventsList.map(event => (
              <div key={event._id} style={{ margin: "10px" }}>
                <Popup content={c => Content(event, c)}>
                  <EventItem event={event} />
                </Popup>
              </div>
            ))
          }
        </div>
        {
          selectedTags.length === 0 && (
            <hr style={{borderTop: "3px solid white", marginLeft: "8px", marginRight: "100px"}}></hr>
          )
        }
        <div className={styles.wrapContainer}>
          {remainingEvents &&
            remainingEvents.map(event => (
              <div key={event._id} style={{ margin: "10px" }}>
                <Popup content={c => Content(event, c)}>
                  <EventItem event={event} />
                </Popup>
              </div>
            ))
          }
        </div>
      </>
    );
  };

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
        <div className={styles.horizontalContent} style={{marginLeft: 10}}>
          <EventsFilter 
            selectedTags={selectedTags} setSelectedTags={setSelectedTags} getEventsList={getEventsList}
            popupTrigger={popupTrigger} setPopupTrigger={getEventsList}       
          />
        </div>
      </div>

      {
        selectedTags.length === 0 && (
          <div className={styles.Division}>
            <div className={styles.horizontalContent} style={{marginLeft: 10}}>
              <div className={styles.whiteHeading}>Trending🔥</div>
            </div>
          </div>
        )
      }

      <PopularEvents/>
      <div className={styles.wrapContainer}>

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

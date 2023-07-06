import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import { useEffect, useState } from "react";
import requestSentStyles from "../styles/RequestsSent.module.css";
import eventStyles from "../styles/event.module.css";

import Axios from "axios";

const RequestItemForMe = ({ event }) => {
  //TODO: DELETE REQUEST to delete the request
  //   const deleteRequest = () => {
  //     axios
  //       .delete("http://localhost:5000/requests/delete/" + _id)
  //       .then((res) => {
  //         setRequests((prev) => prev.filter((r) => r._id !== _id));
  //       })
  //       .catch((err) => console.log(err));
  //   };
  const [requestData, setRequestData] = useState([]);
  const [eventClicked, setEventClicked] = useState(false);
  const popupClose = () => {
    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "0",
          width: "min-content",
        }}
      >
        <button
          onClick={() => {
            setEventClicked(false);
          }}
          className={styles.smallTransparentButton}
        >
          x
        </button>
      </div>
    );
  };
  async function fetchRequest() {
    try {
      const res = await Axios.get(
        "http://localhost:5000/requests/event/" + event._id
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  function makeFirstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function forMeRequestsCallback() {
    return (
      <div className={requestStyles.popupNonCenterItems}>
        <div className={styles.popup}>
          {popupClose()}
          <div className={requestStyles.popupHeading}>Requests: </div>
          <ul className={requestStyles.unorderedList}>
            {requestData.map((req) => (
              <li className={requestSentStyles.requestSentCard}>
                <div className={requestSentStyles.eventPhoto}>
                  <p>Photo</p>
                </div>
                <div className={requestSentStyles.requestSentCardContent}>
                  <h4>
                    <b>{req.requester.username}</b>
                  </h4>
                  <p>{req.requester.age}</p>
                  <p>{makeFirstLetterCapital(req.requester.gender)}</p>
                  <p>{req.requester.email}</p>
                  {req.requester.biography && <p>{req.requester.biography}</p>}
                </div>
                <div className={requestSentStyles.requestCardStatus}>
                  {makeFirstLetterCapital(req.status)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={requestStyles.request}>
      {eventClicked === true && forMeRequestsCallback()}
      <button
        className={eventStyles.eventDetails}
        onClick={() => {
          setEventClicked(true);
          fetchRequest().then((data) => setRequestData(data));
        }}
      >
        <div className={eventStyles.eventPhoto}>
          <p>Photo</p>
        </div>
        <div className={styles.verticalContent}>
          <h1 className={styles.boldtext}>{event.title}</h1>
          <p className={styles.smalltext}>{event.date}</p>
          <p className={styles.smalltext}>{event.location}</p>
          <p className={styles.smalltext}>from ${event.price}</p>
        </div>
      </button>
    </div>
  );
};

export default RequestItemForMe;

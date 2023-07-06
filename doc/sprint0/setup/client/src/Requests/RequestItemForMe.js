import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import { useEffect, useState } from "react";
import requestSentStyles from "../styles/RequestsSent.module.css";

import Axios from "axios";

import EventItem from "../pages/EventItem";

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
  const [forMeRequests, setForMeRequests] = useState([]);
  const fetchRequest = () => {
    Axios.get("http://localhost:5000/requests/event/" + event._id)
      .then((res) => {
        console.log("ForMeReq called: " + res.data);
        setForMeRequests(res.data);
      })
      .catch((err) => console.log(err));
  };

  function makeFirstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const forMeRequestsCallback = (popupClose) => {
    fetchRequest();
    console.log("called");
    return (
      <div className={styles.popupbg}>
        <div className={styles.popup}>
          {popupClose()}
          <div className={requestStyles.popupHeading}>Requests: </div>
          <ul className={requestStyles.unorderedList}>
            {forMeRequests.map((req) => (
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
  };

  return (
    <div className={requestStyles.request}>
      <EventItem
        event={event}
        disableRequest={true}
        onClickCallBack={forMeRequestsCallback}
      />
      {/* <div className={styles.horizontalContent}>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "5px",
            marginRight: "auto",
          }}
        >
          <div className={styles.smalltext}>
            <div style={{ fontWeight: 700 }}>{status}</div>
          </div>
        </div>
        <button className={styles.smallPurpleButton} onClick={deleteRequest}>
          Cancel Request
        </button>
      </div> */}
    </div>
  );
};

export default RequestItemForMe;

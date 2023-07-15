import requestStyles from "../styles/requests.module.css";
import styles from "../styles/common_styles.module.css";
import { useEffect, useState } from "react";
import requestSentStyles from "../styles/RequestsSent.module.css";
import eventStyles from "../styles/event.module.css";

import jwt_decode from "jwt-decode";

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
        "http://localhost:5000/requests/pending/" + event._id
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const rejectRequest  = (reqId) => {
    try {
      console.log(reqId);
      Axios.patch(
        "http://localhost:5000/requests/reject/" + reqId
      );
    } catch (e) {
      console.log(e);
    }
  }

  const acceptRequest  = (reqId) => {
    try {

      // Get username and password
      const token = localStorage.getItem("token")
      const useremail = jwt_decode(token).userDetail.email;
      const username = jwt_decode(token).userDetail.username;

      // Post the chat room
      var participants = [useremail, requestData[0].requester.email];
      participants.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });

      Axios.post("http://localhost:5000/api/chats/", {
        participants: [useremail, requestData[0].requester.email],
        participantsUsernames: [username, requestData[0].requester.username],
        chatHistory: [],
        roomID: participants[0] + participants[1]
      }).then((response) => {console.log(response) })
        .catch((err) => console.log(err));

      Axios.patch("http://localhost:5000/requests/accept/" + reqId);
    } 
    catch (e) {
      console.log(e);
    }
  }

  function makeFirstLetterCapital(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function forMeRequestsCallback() {
    return (
      <div className={styles.popupbg}>
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
                <div className={requestSentStyles.requestButtons}>
                  <button
                    className={requestSentStyles.rejectButton}
                    onClick={() => rejectRequest(req._id)}
                  >
                    Reject
                  </button>
                  <button
                    className={requestSentStyles.acceptButton}
                    onClick={() => acceptRequest(req._id)}
                  >
                    Accept
                  </button>
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
          fetchRequest().then((data) => {setRequestData(data); console.log(requestData);});
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


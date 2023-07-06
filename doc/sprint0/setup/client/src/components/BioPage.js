import React, { useEffect } from "react";
import Axios from "axios";

import { useState, useReducer} from "react";

//import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";
import EventItem from "../pages/EventItem";
import ProfilePicture from "./ProfilePicture";
import styles from "../styles/common_styles.module.css";

const BioPage = (props) => {
  // Get user name from MongoDB
  const userName = "AVINCE";
  const displayName = "Farhan";

  // Get age and gender from MongoDB
  const age = "19";
  const gender = "Male";

  // Get user's profile picture from MongoDB

  // Set the interest master list
  const [interestList, setInterestList] = useState([
    "Hockey",
    "Gaming",
    "Coding",
    "Yoga",
    "Movies",
    "Burger",
    "Books",
  ]);
  const [events, setEvents] = useState([]);

  // Get the user Email by decoding JWT
  const token = localStorage.getItem("token");
  var useremail = jwt_decode(token).userDetail.email;
  var userId = jwt_decode(token).userDetail._id;

  // // Get user details
  // useEffect(() => {
  //   // Get the user token
  //   const token = localStorage.getItem("token");

  //   // Decode this to get user email
  //   var useremail = jwt_decode(token).email;

  //   Axios.get(
  //     "http://localhost:5000/user-details"
  //   ).then((response) => {
  //     setInterestList(response.data[0].interestList);

  //     console.log(response);
  //   });
  // }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents/" + userId).then(
      (response) => {
        setEvents(response.data);
        console.log(response.data);
      }
    );
  }, []);

  return (
    // <div clasName='BioPage'>
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <ProfilePicture />

        <div className={styles.verticalContent}>
          <div className={`${styles.boldtext} ${styles.alignleft}`}>
            {displayName}
          </div>
          <div className={`${styles.smalltext} ${styles.alignleft}`}>
            {age}, {gender}
          </div>
          <UserInterests interestList={interestList} useremail={useremail}/>

          <br />
        </div>
      </div>
      <UserBio useremail={useremail} />
      <div className={styles.line} />
      <div className={styles.horizontalContent}>
        <div className={styles.squishHeading}>My Events</div>
      </div>
      <div className={styles.wrapContainer}>
        {events &&
          events.map((event) => (
            <div key={event._id} style={{ margin: "10px" }}>
              <EventItem event={event} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BioPage;

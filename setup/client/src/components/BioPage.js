import React, { useEffect } from "react";
import Axios from "axios";

import { useState } from "react";

//import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";
import EventItem from "../pages/EventItem";
import ProfilePicture from "./ProfilePicture";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";
import AttendingEvents from "./AttendingEvents";

import StatelessPopup from "../CommonItems/StatelessPopup"; // DEV-CGP-6


const BioPage = (props) => {

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
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [eventToggle, setEventToggle] = useState(false);

  // Get the user Email by decoding JWT
  var token = jwt_decode(localStorage.getItem("token"));
  var useremail = token.userDetail.email;
  var userId = token.id;

  const displayName = token.userDetail.username;

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents/" + userId).then(
      (response) => {
        setEvents(response.data);
        console.log(response.data);
      }
    );
    Axios.get("http://localhost:5000/requests/accepted/" + userId).then((response) => {
        setAttendingEvents(response.data);
        console.log(response.data);
    });
  }, []);

  /* DEV-CGP-6 */
  const [age, setAge] = useState(token.userDetail.age);
  const [gender, setGender] = useState(token.userDetail.gender);
  const [accSetupPopup, accSetupPopupTrigger] = useState(false);

  const handleAccountSetup = (e) => {
    Axios.patch("http://localhost:5000/api/biopage/account_setup/" + useremail, {
      gender: gender,
      age: age,
    }).then((res) => {
      console.log("Account setup complete");
    })
  }


  return (
    // <div clasName='BioPage'>
    <div className={styles.rightContainer}>
      <StatelessPopup trigger={accSetupPopup} setTrigger={accSetupPopupTrigger}> {/*DEV_CGP-6*/}
        <form className={styles.verticalContent} onSubmit={(e) => {handleAccountSetup(e)}}>
          <div className={styles.division}>
            <label className={styles.text}>Age: </label>
            <input
              className={styles.inputField}
              name="Age"
              type="number"
              min={18}
              value={age}
              placeholder="1"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className={styles.division}>
            <label className={styles.text}>Gender: </label>
            <select
              name="gender"
              className={styles.inputField}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Please select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="secret">Prefer not to say</option>
            </select>
          </div>
          <div className={styles.division}>
            <button type="submit" className={styles.purpleButton}>
              Submit
            </button>
          </div>
            
        </form>
      </StatelessPopup>


      <div className={styles.horizontalContent}>
        <ProfilePicture email={useremail} url={"http://localhost:5000/user-details/image/"} />

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
      <UserBio useremail={useremail} url="http://localhost:5000/user-details/biography/" />
      <div className={styles.line} />
      <div className={styles.horizontalContent}>
        <div style={{ flex: "1" }}>
          <button
            className={styles.smallTransparentButton}
            onClick={() => setEventToggle(false)}
            disabled={!eventToggle}
          >
            My Events
          </button>
        </div>

        <div style={{ flex: "1" }}>
          <button
            className={styles.smallTransparentButton}
            onClick={() => setEventToggle(true)}
            disabled={eventToggle}
          >
            Events I'm Attending
          </button>
        </div>
      </div>

      {eventToggle ? <AttendingEvents /> : (
          <div className={styles.wrapContainer}>
          {events &&
              events.map((event) => (
                  <div key={event._id} style={{margin: "10px"}}>
                      <EventItem event={event} />
                  </div>
              ))}
          </div>
      )}
      
    </div>
  );
};

export default BioPage;

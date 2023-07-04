import React from "react";
//import Axios from "axios";

import { useState } from "react";
//import { useEffect } from "react";

//import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";
import UserCreatedEvents from "./UserCreatedEvents";

const ProfilePicture = (props) => {
  return <div className={bioPageStyles.ProfilePicture}></div>;
};

const BioPage = (props) => {
  // Get user name from MongoDB
  const userName = "AVINCE";
  const displayName = "Farhan";

  // Get age and gender from MongoDB
  const age = "19";
  const gender = "Male";

  // Get user's profile picture from MongoDB

  // Set the interest master list
  const [interestList, setInterestList] = useState(["Hockey", "Gaming", "Coding", "Yoga", "Movies", "Burger", "Books"]);
  
  // Get the user Email by decoding JWT
  const token = localStorage.getItem("token");
  var useremail = jwt_decode(token).email;

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
          <UserInterests interestList={interestList} />

          <br />
        </div>
      </div>
      <UserBio useremail={useremail} />
      <div className={styles.line} />
    </div>
  );
};

export default BioPage;

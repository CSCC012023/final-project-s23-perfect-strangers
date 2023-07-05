import React from "react";
import Axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

//import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";


const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState([]);
  const [profileClicked, setProfileClicked] = useState(false);
  const token = localStorage.getItem("token");
  var useremail = jwt_decode(token).userDetail.email;

  const changeProfilePic = () => {
      Axios.post("http://localhost:5000/user-details/image/",
    {
      email: useremail,
      image: profilePic,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    Axios.get("http://localhost:5000/user-details/image/" + useremail)
      .then((response) => {
        setProfilePic(response.data.image);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {profileClicked === true ? (
        <div className={styles.popupbg}>
          <div className={styles.popup}>
            <div
              style={{
                  marginLeft: "auto",
                  marginRight: "0",
                  width: "min-content",
              }}
            >
              <button
                  onClick={() => {
                      setProfileClicked(false);
                  }}
                  className={styles.smallTransparentButton}
              >
                  x
              </button>
            </div>

              
            <>
                <div className={styles.flexWrappableText}>
                    Change profile picture?
                </div>
                <form action="/" encType="multipart/form-data" method="post">
                  <input class="choose-file-btn" type="file" name="profilePic" style={{color: "white"}}/>
                  <input class="upload-btn" type="submit" value="Upload Photo" />
                </form>
                <button
                    className={styles.smallTransparentButton}
                    onClick={changeProfilePic}
                >
                    Change
                </button>
            </>
              
          </div>
        </div>
      ) : (
          ""
      )}
      <button
        className={bioPageStyles.ProfilePicture}
        onClick={() => setProfileClicked(true)}
      >
        {profilePic}
      </button>
    </>
  );
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

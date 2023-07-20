import React, { useEffect } from "react";
import Axios from "axios";

import { useState, useReducer } from "react";

import jwt_decode from "jwt-decode";

import styles from "../styles/common_styles.module.css";
import bioPageStyles from "../styles/bio_page.module.css";
import jwtDecode from "jwt-decode";

import UserBio from "../components/UserBio";
import EventItem from "../pages/EventItem";
import UserInterests from "../components/Interests";
import { useNavigate } from "react-router";

const ProfilePicture = ({ token }) => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [profilePic, setProfilePic] = useState("");

  const [profileClicked, setProfileClicked] = useState(false);
  console.log(token);
  var useremail = token.businessDetail.email;

  const changeProfilePic = e => {
    e.preventDefault();
    forceUpdate();

    if (profilePic !== "") {
      console.log(profilePic);

      const formData = new FormData();
      formData.append("email", useremail);
      formData.append("profilePic", profilePic);

      Axios.post("http://localhost:5000/business/image/", formData)
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
      console.log("Image uploaded");
      setProfileClicked(false);
    }
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Sets profile picture to existing picture in mongoDB
  useEffect(() => {
    Axios.get("http://localhost:5000/business/image/" + useremail)
      .then(response => {
        localStorage.setItem(
          "userPic",
          _arrayBufferToBase64(response.data.image.data.data)
        );
        //console.log(response);
      })
      .catch(err => console.log(err));
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

              <form onSubmit={changeProfilePic} encType="multipart/form-data">
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="profilePic"
                  onChange={e => {
                    setProfilePic(e.target.files[0]);
                    forceUpdate();
                  }}
                  style={{ color: "white" }}
                />

                <input
                  className="upload-btn"
                  type="submit"
                  value="Upload Photo"
                />
              </form>
            </>
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        className={bioPageStyles.ProfilePictureButton}
        onClick={() => setProfileClicked(true)}
      >
        <img
          className={bioPageStyles.ProfilePicture}
          src={`data:image/png;base64,${localStorage.getItem("userPic")}`}
          alt=""
        />
      </button>
    </>
  );
};

const BusinessDashboard = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  const email = token.businessDetail.email;
  const businessName = token.businessDetail.businessName;

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const interestList = [
    "Hockey",
    "Gaming",
    "Coding",
    "Yoga",
    "Movies",
    "Burger",
    "Books",
  ];

  useEffect(() => {
    Axios.get("http://localhost:5000/api/userevents/" + token.id).then(
      response => {
        setEvents(response.data);
        console.log(response.data);
      }
    );
  }, []);

  return (
    <div className={styles.rightContainer}>
      <div className={styles.horizontalContent}>
        <ProfilePicture token={token} />
        <div className={styles.verticalContent}>
          <div className={`${styles.boldtext} ${styles.alignleft}`}>
            {businessName}
          </div>
          <div style={{height: "min-content"}}>
            <UserInterests interestList={interestList} useremail={email}/>
          </div>
        </div>
      </div>
      <UserBio useremail={email} url="http://localhost:5000/business/biography/" />
      <div className={styles.line} />
      <div
        style={{ marginLeft: "auto", marginRight: "0px", width: "min-content" }}
      >
        <button
          className={styles.smallPurpleButton}
          onClick={() => navigate("/create-events")}
        >
          Create Events
        </button>
      </div>
      <div className={styles.wrapContainer}>
        {events &&
          events.map(event => (
            <div key={event._id} style={{ margin: "10px" }}>
              <EventItem event={event} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BusinessDashboard;

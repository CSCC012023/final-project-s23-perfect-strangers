import React from "react";
import Axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import "./BioPage.css";
import UserInterests from "./Interests";

import jwt_decode from "jwt-decode";

import UserBio from "./UserBio";

const ProfilePicture = (props) => {
  return <div className="ProfilePicture"></div>;
};

const DisplayName = (props) => {
  return <div className="DisplayName">{props.displayName}</div>;
};

const AgeGender = (props) => {
  return (
    <div className="AgeGender">
      {props.age}, {"           "}
      {props.gender}
    </div>
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
    <div className="BioPage">
        <div className="page-title">
            <h1>ACCOUNT</h1>
        </div>

      <div className="BioPageTop">
        <ProfilePicture />

        <div className="BioPageTopRight">
          <DisplayName displayName={displayName} />
          <AgeGender age={age} gender={gender} />
          <UserInterests useremail={useremail} interestList={interestList} />
          <br />
        </div>
      </div>
      <UserBio username={userName} />
    </div>
  );
};

export default BioPage;

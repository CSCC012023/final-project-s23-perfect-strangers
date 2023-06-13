import React from 'react';
import Axios from "axios";

import { useState } from "react";

import './BioPage.css'
import UserInterests from './Interests';

import UserBio from "./UserBio";


const ProfilePicture = (props) => {
    return(
        <div className="ProfilePicture">
        </div>
    )
}

const DisplayName = (props) => {
    return(
        <div className='DisplayName'>
            {props.displayName}
        </div>
    )
}

const AgeGender = (props) => {
    return(
        <div className='AgeGender'>
            {props.age}, {"           "}{props.gender}
        </div>
    )
}

const BioPage = (props) => {
    // Get user name from MongoDB
    const userName = "faisalf4";
    const displayName = "Farhan";

    // Get age and gender from MongoDB
    const age = "19";
    const gender = "Male";

    // Get user's profile picture from MongoDB


    // Get all possible interests from MongoDB
    const [interestList, setInterestList] = useState([])
    Axios.get("http://localhost:5000/api/userInterests/masterInterestList")
    .then((response) => {
        setInterestList(response.data[0].interestList);
    });


    return(
        // <div clasName='BioPage'>
        <div className="BioPage">
            <div className='BioPageTop'>
                <ProfilePicture/>

                <div className='BioPageTopRight'>
                    <DisplayName displayName={displayName}/>
                    <AgeGender age={age} gender={gender}/>
                    <UserInterests interestList={interestList}/>
                </div>
            </div>
            <UserBio username={userName}/>
        </div>
    );
};

export default BioPage;
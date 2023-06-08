import React from 'react';
import Axios from "axios";

import { useState } from "react";

import './BioPage.css'
import UserInterests from './Interests';


const ProfilePicture = (props) => {
    return(
        <div className="ProfilePicture">
        </div>
    )
}

const UserName = (props) => {
    return(
        <div className='UserName'>
            {props.userName}
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
    const userName = "Farhan";

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
        <div className='BioPageTop'>
            <ProfilePicture/>

            <div className='BioPageTopRight'>
                <UserName userName={userName}/>
                <AgeGender age={age} gender={gender}/>
                <UserInterests interestList={interestList}/>
            </div>
        </div>
    );
};

export default BioPage;
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import React from 'react';
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
    const age = "19";
    const gender = "Male";

    // Get user's profile picture from MongoDB
    // npm install primereact primeicons
    return(
        <div className='BioPageTop'>
            <ProfilePicture/>

            <div className='BioPageTopRight'>
                <UserName userName={userName}/>
                <AgeGender age={age} gender={gender}/>
                <UserInterests/>
            </div>
        </div>
    );
};

export default BioPage;
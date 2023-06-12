import React from 'react';

import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";

import { IconContext } from "react-icons"; // npm install react-icons --save
import { CiEdit } from "react-icons/ci";
import Axios from "axios";
import './Interests.css'
import 'reactjs-popup/dist/index.css'; // npm i reactjs-popup


const InterestPopUp = (props) => {

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [selectedInterests, setSelectedInterests] = useState(props.userInterestList);

    function changeInterestColorToPurple(colorList, index){
        if(colorList[index] !== '#B14EFF'){
            var tempList = colorList;
            tempList[index] = '#B14EFE';
            props.setInterestColorList(tempList);
            forceUpdate();
        }
    }

    function changeInterestColorToWhite(colorList, index){
        if(colorList[index] !== '#B14EFF'){
            var tempList = colorList;
            tempList[index] = 'white';
            props.setInterestColorList(tempList);
            forceUpdate();
        }
    }

    function popUpInterestItemClickHandler(currentItem, index, colorList){
        const isPresent = selectedInterests.indexOf(currentItem) > -1;
        var tempList = colorList;          

        if (!isPresent && selectedInterests.length < 5){
            tempList[index] = '#B14EFF';
            props.setInterestColorList(tempList);

            setSelectedInterests([...selectedInterests, currentItem])
            forceUpdate();
        }
        else{
            tempList[index] = 'white';
            props.setInterestColorList(tempList);

            setSelectedInterests(selectedInterests.filter((interest) => interest !== currentItem));
            forceUpdate();
        }
    }

    function interestPopupCloseHandler(){
        props.setPopupTrigger(false)
        props.setUserInterestList(selectedInterests);

        Axios.delete("http://localhost:5000/api/userInterests/faisalf4")
        .then((response) => {
            console.log("User Interest document deleted!");
        });

        Axios.post("http://localhost:5000/api/userInterests/", {
            username: "faisalf4", 
            interestList: selectedInterests
        })
    }

    const globalInterestListUI = props.interestList.map((interestItem, interestIndex) => {
        return(
            <div 
                className='GlobalIndvInterest' 
                style={{backgroundColor: props.interestColorList[interestIndex]}}
                onMouseEnter={(event) => {changeInterestColorToPurple(props.interestColorList, interestIndex)}}
                onMouseLeave={(event) => {changeInterestColorToWhite(props.interestColorList, interestIndex)}}
                onClick={(event) => {popUpInterestItemClickHandler(interestItem, interestIndex, props.interestColorList)}}
            >
                {interestItem}
            </div>
        )
    })

    return (props.popupTrigger) ? (
        <div className='InterestPopup'>
            <div className='InterestPopup-inner'>
                <button className="InterestPopupCloseBtn" onClick={(event) => {interestPopupCloseHandler()}}>
                    Save changes
                </button>

                <br/><br/>

                <div>
                    {globalInterestListUI}
                </div>
            </div>
        </div>
    ) : "";
}

const UserInterests = (props) => {
    // Get the user's interests from MongoDB
    // Limit to a maximum of 5 interests
    const [userInterestList, setUserInterestList] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:5000/api/userInterests/faisalf4")
        .then((response) => {
            setUserInterestList(response.data[0].interestList);
        });
    }, []);

    const [interestColorList, setInterestColorList] = useState(
        props.interestList.map((interest, interestIndex) => {
            const isPresent = userInterestList.indexOf(interest) > -1;
            if (!isPresent){
                return (
                    'white'
                )
            }
            else{
                return(
                    '#B14EFF'
                )
            }
        })
    );

    const [popupTrigger, setPopupTrigger] = useState(false);

    const userinterestListUI = userInterestList.map((interestItem, interestIndex) => {
        return(
            <div className="UserIndvInterest">
                {interestItem}
            </div>
        )
    })


    return(
        <div className="UserInterestList">
            {userinterestListUI}

            <button 
                className="InterestEditBtn" 
                onClick={() => setPopupTrigger(true)}
            >
                <IconContext.Provider value={{ color: "white", size: 25}}>
                    <CiEdit/>
                </IconContext.Provider>
            </button>

            <InterestPopUp 
                popupTrigger={popupTrigger} setPopupTrigger={setPopupTrigger} 
                userInterestList={userInterestList} setUserInterestList={setUserInterestList}
                interestList={props.interestList}
                interestColorList={interestColorList}setInterestColorList={setInterestColorList}
            />
        </div>
    )
}

export default UserInterests;
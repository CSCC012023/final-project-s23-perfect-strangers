import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from 'axios';
import './CreateEvents.css';

import styles from "../styles/common_styles.module.css";
import ceStyles from "./CreateEvents.module.css";
import jwt_decode from "jwt-decode";

import EventTags from "./CreateEvents.Tags"


function CreateEvents() {
    const token = localStorage.getItem('token');
    const [creator, setCreator] = useState(jwt_decode(token).userDetail);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [onMe, setOnMe] = useState(false);

    // DEV-CGP-9
    const [selectedTags, setSelectedTags] = useState(["Other"]);
    const [popupTrigger, setPopupTrigger] = useState(false);
    

    // const [createdUserEvents, setCreatedUserEvents] = useState([]);

    // didn't use any of this, but it can be revived if needed

    // useEffect(() => {
    //     console.log(decoded);
    //     Axios.get("http://localhost:5000/api/eventlink/" + decoded.userDetail.email)
    //         .then((response) => {
    //         if (response.length === 0) {
    //             setCreatedUserEvents([]);
    //         } else {
    //             setCreatedUserEvents(response.data[0].eventList);
    //         }
    //         })
    //         .catch((error) => {
    //             setCreatedUserEvents([]);
    //         });
    // }, []);

    // useEffect(() => {
    //     updateEvents();
    // }, [createdUserEvents]);

    // async function updateEvents() {
    //     console.log(createdUserEvents);
    //     await Axios.delete("http://localhost:5000/api/eventLink/" + decoded.userDetail.email).then(
    //         (response) => {
    //         console.log("Event link document deleted!");
    //     });
    //     await Axios.post("http://localhost:5000/api/eventLink", {
    //         email: decoded.userDetail.email,
    //         eventList: createdUserEvents,
    //     }).then(response => {
    //         console.log(response);
    //     });
    // }

    async function createUserEvent() {
        // create a unique ID for the event
        const newUUID = uuidv4();//uuid();
        
        // post the event
        await Axios.post("http://localhost:5000/api/userevents", {
            eventID: newUUID,
            creator, title, date, location, price, description, ticketLink, onMe,
            tags: selectedTags // DEV-CGP-9
        }).then(() => {
            alert("Event Created!");
        }).catch((err) => console.log(err));
    };


    return (

        <div className={ceStyles.createEventsPopup}>
            <div className={styles.horizontalContent}>
                <div className={styles.squishHeading}>Create Your Event</div>
            </div>
            <div>
                <div className={styles.horizontalContent}>
                    
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Give the event a name</p><br />
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='name' onChange={(event) => setTitle(event.target.value)}></input>
                        </div>
                    </div>

                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>When is your event?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='date' className={styles.inputField} placeholder='date' onChange={(event) => setDate(event.target.value)}></input> 
                        </div>
                    </div>
                </div>


                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Where will it be?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='location' onChange={(event) => setLocation(event.target.value)}></input>
                        </div>
                    </div>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>How much is a ticket?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='number' className={styles.inputField} placeholder='price' onChange={(event) => setPrice(event.target.value)}></input>
                        </div>
                    </div>
                </div>
                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Are tickets OnMe?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type="radio" name="OnMe" value ="true" className="OnMeRadio" onClick={() => setOnMe(true)}></input><p className={styles.text}>Yes</p>
                            <input type="radio" name="OnMe" value="false" className="OnMeRadio" onClick={() => setOnMe(false)}></input><p className={styles.text}>No</p> 
                        </div>
                        {/* <input type='checkbox' className="EventBox" onChange={() => setOnMe(!onMe)}></input> */}
                    </div>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                            <p className={styles.text}>Where can you buy tickets?</p><br/>
                        </div>
                        <div className={styles.division}>
                            <input type='text' className={styles.inputField} placeholder='link' onChange={(event) => setTicketLink(event.target.value)}></input>
                        </div>
                    </div>
                </div>
                <div className={styles.horizontalContent}>
                    <div className={styles.verticalContent}>
                        <div className={styles.division}>
                          <p className={styles.text}>Describe the event for others</p><br/>
                        </div>
                        <div className={styles.division}>
                          <textarea className={styles.inputField} style={{width: '500px'}}placeholder="type of event, genre of music..." onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>
                    </div>

                    {/* DEV-CGP-9 */}
                    <div className={styles.verticalContent}>
                      <div className={styles.division} onClick={(e) => {setPopupTrigger(true)}}>
                        <p className={styles.text}>Event Tags</p><br/>
                      </div>
                      
                      <div className={ceStyles.division}>
                        <EventTags selectedTags={selectedTags} setSelectedTags={setSelectedTags}
                            popupTrigger={popupTrigger} setPopupTrigger={setPopupTrigger}
                        />
                      </div>
                    </div>

                </div>
                <div className={styles.division}>
                    <button className={styles.purpleButton} onClick={createUserEvent}>
                        Create Event
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CreateEvents;
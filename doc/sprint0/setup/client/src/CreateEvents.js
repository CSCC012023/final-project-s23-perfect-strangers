import { useState, useEffect } from "react";
import Axios from 'axios';
import './CreateEvents.css';

function CreateEvents() {
    const [creator, setCreator] = useState("Jeremy");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [ticketLink, setTicketLink] = useState("");
    const [onMe, setOnMe] = useState(false);

    const createUserEvent = () => {
        Axios.post("http://localhost:5000/userevents/add", {
            creator, title, date, location, price, description, ticketLink, onMe
        }).then(() => {
            alert("Event Created!");
        });
    };


    return (
        <div className="CreateEvents">
            <h1 className="EventTitle">Create Your Event</h1>
            <div className="EventInfo">
                <div className="Column">
                    <div>
                        <p className="EventText">Give the event a name</p><br />
                        <input type='text' className="EventDetails" placeholder='name' onChange={(event) => setTitle(event.target.value)}></input> 
                    </div>
                    <div>
                        <p className="EventText">When is your event?</p><br/>
                        <input type='date' className="EventDetails" placeholder='date' onChange={(event) => setDate(event.target.value)}></input> 
                    </div>
                </div>
                <div className="Column">
                    <div>
                        <p className="EventText">Where will it be?</p><br/>
                        <input type='text' className="EventDetails" placeholder='location' onChange={(event) => setLocation(event.target.value)}></input>
                    </div>
                    <div>
                        <p className="EventText">How much is a ticket?</p><br/>
                        <input type='number' className="EventDetails" placeholder='price' onChange={(event) => setPrice(event.target.value)}></input>
                    </div>
                </div>
                <div className="Column">
                    <div>
                        <p className="EventText">Are tickets OnMe?</p><br/>
                        <input type="radio" name="OnMe" value ="true" className="OnMeRadio" onClick={() => setOnMe(true)}></input><p className="OnMeText">Yes</p>
                        <input type="radio" name="OnMe" value="false" className="OnMeRadio" onClick={() => setOnMe(false)}></input><p className="OnMeText">No</p>
                        {/* <input type='checkbox' className="EventBox" onChange={() => setOnMe(!onMe)}></input> */}
                    </div>
                    <div>
                        <p className="EventText">Where can you buy tickets?</p><br/>
                        <input type='text' className="EventDetails" placeholder='link' onChange={(event) => setTicketLink(event.target.value)}></input>
                    </div>
                </div>
                <div>
                    <p className="EventText">Describe the event for others</p><br/>
                    <textarea className="EventDetails" style={{width: '500px'}}placeholder="type of event, genre of music..." onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>
                    <button className="EventButton" onClick={createUserEvent}>Create Event</button>
            </div>
        </div>
    );
}

export default CreateEvents;
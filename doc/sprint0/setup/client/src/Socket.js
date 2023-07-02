import { useEffect} from "react";
import { useState } from "react";

import {io} from 'socket.io-client'

import { Box, Card, InputLabel, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send' // npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// import InputLabel from "@mui/material/InputLabel";

import jwt_decode from "jwt-decode";





const Header = (props) => {

    return(
        <Card sx={{marginTop: 5, backgroundColor: "gray"}} raised>
            <Link to="/">
                <Button sx={{color: "white", textDecoration: "none"}} variant="text">
                    Home
                </Button>
            </Link>

            <Link to="/chats">
                <Button sx={{color: "white", textDecoration: "none"}} variant="text">
                    Chats
                </Button>
            </Link>

            <Link to={`/room/${props.roomID}`}>
                <Button sx={{color: "white", textDecoration: "none"}} variant="text">
                    Room1
                </Button>
            </Link>
        </Card>
    )
}


const MessageContainer = (props) => {
    return(
        <div style={{ height: '45px', margin: 1, padding: 3, width: 'inherit'}}>
            <div 
                style={{
                    textAlign: 'center',
                    backgroundColor: 'black', color: 'white',  
                    padding: 8, margin: 2, borderRadius: 20,
                    width: 'fit-content', 
                    float: props.position,
                }}
            >
                {console.log(props.message)}
                {props.message}
            </div>
        </div>
    )
}

const SendChat = (props) => {
    return (
        <Box component="form" onSubmit={props.handleForm}>
            {
                props.typing && (
                    <InputLabel sx={{color: 'white'}} shrink htmlFor="message-input">
                        Typing...
                    </InputLabel>
                )
            }   

            <OutlinedInput
                sx={{backgroundColor: 'white', color: 'black', width: '100%'}}
                id="outlined-adornment-password" placeholder="Write your message"
                value={props.message} onChange={(e) => props.handleInput(e)}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton type='submit' aria-label="toggle password visibility">
                            <SendIcon/>
                        </IconButton>
                    </InputAdornment>
                }
            /> 
        </Box>
    )
}


const Socket = () => {

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);

    const [typingTimeout, setTypingTimeout] = useState(null);

    const roomID = "123455667";

    useEffect(() => {
        // connect to socket backend 
        // Need to specify url ofsocket server
        setSocket(io("http://localhost:5000")); 
    }, []);

    useEffect(() => {
        if (socket !== null){
            socket.emit('join-room', {roomID});
            socket.on('message-from-server', (data) => {
                console.log("message received from server" + " " + data);
                setChat((prev) => [...prev, {message: data, received: true}]);
            })

            socket.on('typing-started-from-server', (roomID) => {
                console.log("typing...");
                setTyping(true);
            })
            
            socket.on('typing-ended-from-server', (roomID) => {
                console.log("typing stopped");
                setTyping(false);
            })
        }
    }, [socket]);


    const handleForm = (e) => {
        e.preventDefault();
        socket.emit("send-message", {message, roomID}); // send an event from our client
        setChat((prev) => [...prev, {message: message, received: false}]);
        socket.emit("end-typing", {roomID});
        setMessage("");
    }

    const handleInput = (event) => {
        setMessage(event.target.value);
        socket.emit('start-typing', {roomID});

        // Debounce effect
        if (typingTimeout) clearTimeout(typingTimeout);
        setTypingTimeout(
            setTimeout(() => {
                socket.emit("end-typing", {roomID});
            }, 5000)
        )
    }

    return (
        <>
        <Header roomID={roomID}/>
        <Box sx={{display: "flex", justifyContent: "center"}}>
            
            <Card 
                sx={{
                    padding: 2, marginTop: 10, width: '60%', backgroundColor: 'gray',
                    color: 'white'
                }}
            >
                <Box sx={{marginBotton: 5, position: 'relative'}}>
                {/* <div style={{marginBotton: 5}}> */}

                
                    { 

                        chat.map((data, dataIndex) => (
                            <MessageContainer message={data.message} position={data.received ? "left": "right"}/> 
                            // <Typography key={dataIndex} sx={{textAlign: data.received ? "left": "right"}}>
                            //     {/* <MessageContainer message={data.message} /> */}
                            //     {data.message}
                            // </Typography>
                        ))
                    }
                </Box>

                <SendChat typing={typing} message={message} setMessage={setMessage} handleForm={handleForm} handleInput={handleInput}/>
            </Card>
        </Box>
    </>
    )
}

export default Socket;
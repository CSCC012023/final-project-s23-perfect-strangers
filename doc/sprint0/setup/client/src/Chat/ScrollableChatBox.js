import { useEffect, useRef} from "react";
import chatRoomStyle from "./ChatRoom.module.css";

const ScrollableChatBox = ({chat, userEmail}) => {
    
    // These variables will help us scroll our divs to the dorrect position
    const outerDiv = useRef(null);
    const innerDiv = useRef(null);
    
    // Start the container at the bottom
    useEffect(() => {
        const outerHeight = outerDiv.current.clientHeight;
        const innerHeight = innerDiv.current.clientHeight;

        // Scroll down to the latest message
        outerDiv.current.scrollTo({
            top: innerHeight - outerHeight,
            left: 0
        });
    }, []);

    // Same thing as above but does so when new messages are rendered
    useEffect(() => {
        const outerHeight = outerDiv.current.clientHeight;
        const innerHeight = innerDiv.current.clientHeight;

        outerDiv.current.scrollTo({
            top: 2*innerHeight - outerHeight,
            left: 0,
            behavior: "smooth"
        });
    }, [chat]);


    return (
        <div ref={outerDiv} style={{position: "relative", height: "100%", overflow: "scroll" }}>
          <div ref={innerDiv} style={{position: "relative"}}>
             { 
                chat.map((message, dataIndex) => (
                    <MessageContainer key = {dataIndex} message={message.text} 
                        position={(message.senderEmail.localeCompare(userEmail) === 0) ? "right": "left"}
                    /> 
                ))
            }
          </div>
        </div>
      )
}

const MessageContainer = (props) => {
    return(
        <div className={chatRoomStyle.messageRow} key = {props.dataIndex}>
            <div className={chatRoomStyle.message} style={{ float: props.position }}>
                {props.message}
            </div>
        </div>
    )
}

export default ScrollableChatBox;
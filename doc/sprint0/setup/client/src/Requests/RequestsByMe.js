import { useState } from "react";
import RequestItemByMe from "./RequestItemByMe";

const RequestsByMe = ({email}) => {

    const [requests, setRequests] = useState([]);



    return ( <div>
        <RequestItemByMe requestee="requestee@gmail.com" />
    </div> );
}
 
export default RequestsByMe;
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import RequestItemForMe from "./RequestItemForMe";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

const RequestsForMe = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  console.log(token);

  const [myEvents, setMyEvents] = useState([]);
  const [forMeRequests, setForMeRequests] = useState([]);

  // useEffect(() => {
  //   Axios.get("http://localhost:5000/requests/for/" + token.id)
  //     .then((res) => {
  //       console.log(res.data);
  //       setForMeRequests(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/myevent/" + token.id)
      .then((res) => {
        setMyEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  
  return (
    <div className={styles.wrapContainer}>
      {myEvents.map((event) => (
        <RequestItemForMe
          event={event}
        />
      ))}{" "}
    </div>
  );
};

export default RequestsForMe;

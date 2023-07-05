import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import RequestItemByMe from "./RequestItemByMe";

import Axios from "axios";

import styles from "../styles/common_styles.module.css";

const RequestsForMe = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  console.log(token);

  const [forMeRequests, setForMeRequests] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/requests/for/" + token.id)
      .then((res) => {
        console.log(res.data);
        setForMeRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.wrapContainer}>
      {forMeRequests.map((req) => (
        <RequestItemByMe
          key={req._id}
          _id={req._id}
          requestee={req.requestee}
          event={req.event}
          status={req.status}
          setRequests={setForMeRequests}
        />
      ))}{" "}
    </div>
  );
};

export default RequestsForMe;

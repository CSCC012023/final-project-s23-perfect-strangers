import jwt_decode from "jwt-decode";

import RequestsByMe from "./RequestsByMe";

import styles from "../styles/common_styles.module.css";

const RequestsPage = () => {

    return ( <div className={styles.rightContainer}>
        <RequestsByMe />
    </div> );
}
 
export default RequestsPage;
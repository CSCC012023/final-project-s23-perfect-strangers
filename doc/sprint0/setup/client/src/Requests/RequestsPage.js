import jwt_decode from "jwt-decode";

import RequestsByMe from "./RequestsByMe";

import styles from "../styles/common_styles.module.css";

const RequestsPage = () => {

    const token = jwt_decode(localStorage.getItem('token'));

    return ( <div className={styles.rightContainer}>
    
    <RequestsByMe email={token.email} />

    </div> );
}
 
export default RequestsPage;
import { useState } from "react";

import styles from "../styles/common_styles.module.css";

import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AccountSetup = ({ accountSetupCallback, email, username, url, successfunc }) => {
  // state for age and gender
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  // DEV-CGP-5: custom url for making users
  const requestUrl = (url === undefined) ? "http://localhost:5000/user-details/" : url;

  // function to check age when a user enters it
  const checkAndSetAge = (val) => {
    let intVal = parseInt(val);
    if (intVal === NaN) setAge(18);
    else setAge(intVal);
  };


  // function to call post request when submit button is pressed
  const handleOnSubmit = (e) => {
    e.preventDefault();

    Axios.post(requestUrl, {
      email: email,
      username: username,
      age: age,
      gender: gender,
    }).then((res) => {
      console.log(res);
      if (successfunc !== undefined) successfunc(res);// DEV-CGP-5: call a custom function after successful account setup
      navigate(accountSetupCallback, {email: email}); // DEV-CGP-6
    });
  };

  return username !== undefined &&
    email !== undefined &&
    username !== "" &&
    email !== " " ? (
    <div className={styles.container}>
      <h1 className={styles.heading}>ACCOUNT SETUP</h1>
      <div className={styles.division}>
        <p className={styles.text}>{username}</p>
        <p className={styles.text}>|</p>
        <p className={styles.text}>{email}</p>
      </div>

      <form className={styles.verticalContent} onSubmit={handleOnSubmit}>
        <div className={styles.division}>
          <label className={styles.text}>Age: </label>
          <input
            className={styles.inputField}
            name="Age"
            type="number"
            min={18}
            value={age}
            placeholder="1"
            onChange={(e) => checkAndSetAge(e.target.value)}
          />
        </div>
        <div className={styles.division}>
          <label className={styles.text}>Gender: </label>
          <select
            name="gender"
            className={styles.inputField}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Please select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="secret">Prefer not to say</option>
          </select>
        </div>
        <div className={styles.division}>
          <button type="submit" className={styles.purpleButton}>
            Submit
          </button>
        </div>
          
      </form>
    </div>
  ) : (
    <div className={styles.container}>
      <h1 className={styles.heading}>BRO GO BACK</h1>
    </div>
  );
};

export default AccountSetup;

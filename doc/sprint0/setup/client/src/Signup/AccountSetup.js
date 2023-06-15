import { useState } from "react";
import styles from "./Signup.module.css";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";

const AccountSetup = ({ accountSetupCallback }) => {
  // get email and username from global storage
  const { email, username } = useSelector((state) => state.userInfo);

  // state for age and gender
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("");

  // function to check age when a user enters it
  const checkAndSetAge = (val) => {
    let intVal = parseInt(val);
    if (intVal === NaN) setAge(18);
    else setAge(intVal);
  };

  // function to call post request when submit button is pressed
  const handleOnSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/user-details/", {
      email: email,
      age: age,
      gender: gender,
    }).then((res) => {
      //console.log(res);
      //accountSetupCallback();
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
      <form className={styles.signupForm} onSubmit={handleOnSubmit}>
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
        <Link to={accountSetupCallback}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </Link>
      </form>
    </div>
  ) : (
    <div className={styles.container}>
      <h1 className={styles.heading}>BRO GO BACK</h1>
    </div>
  );
};

export default AccountSetup;
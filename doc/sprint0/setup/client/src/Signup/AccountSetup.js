import { useState } from 'react';
import styles from './Signup.module.css';
import { useSelector } from 'react-redux';

const AccountSetup = () => {

    const {email, username} = useSelector(state => state.userInfo);

    const [age, setAge] = useState(1);
    const [gender, setGender] = useState('');

    const checkAndSetAge = (val) => {
        let intVal = parseInt(val);
        if(intVal === NaN) setAge(1);
        else setAge(intVal);
    }

    return ( (username !== undefined) && (email !== undefined) && (username !== '') && (email !== ' ') ?
        <div className={styles.container}>
            <h1 className={styles.heading}>ACCOUNT SETUP</h1>
            <div className={styles.division}>
                <p className={styles.text}>{username}</p>
                <p className={styles.text}>|</p>
                <p className={styles.text}>{email}</p>
            </div>
            <div className={styles.division} >
                <label className={styles.text}>Age: </label>
                <input 
                    className={styles.inputField}
                    name='Age'
                    type='number'
                    min={0}
                    value={age}
                    placeholder='1'
                    onChange={(e) => checkAndSetAge(e.target.value)}/>
            </div>
            <div className={styles.division} >
                <label className={styles.text}>Gender: </label>
                <select
                    name='gender'
                    className={styles.inputField}
                    onChange={(e) => setGender(e.target.value)}>
                    <option value=''>Please select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="na">Prefer not to say</option>
                </select>
            </div>
        </div>
        : <div className={styles.container}>
            <h1 className={styles.heading}>BRO GO BACK</h1>
        </div>
    );
}
 
export default AccountSetup;
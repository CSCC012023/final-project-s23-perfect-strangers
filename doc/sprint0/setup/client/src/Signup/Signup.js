import { useState } from "react";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitCallback = (e, p) => {
        //TODO: call database to check for email e and password p combination.

        console.log(e, p);
    }

    return ( <div>
        <form onSubmit={(event) => {
            event.preventDefault();
            if(email === '') {
                alert('Email field is empty. Please enter a valid email address.');
                return
            } else if(password === '') {
                alert('Password field is empty. Please enter your Password.');
                return
            }
            onSubmitCallback(email, password);
        }}>
            <input 
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />
            <input 
                type="text"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign up</button>
        </form>
        <p>{email}</p>
        <p>{password}</p>
    </div> );
}
 
export default Signup;
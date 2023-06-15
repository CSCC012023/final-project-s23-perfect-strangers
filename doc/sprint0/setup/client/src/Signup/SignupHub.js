import { useState } from "react";
import Signup from "./Signup";
import AccountSetup from "./AccountSetup";

// compound component for the signup page and account setup page.

const SignupHub = ({accountSetupCallback, loginRedirect}) => {

    // accoutSepupCallback is for when the user successfully setup their account
    // loginRedirect is when the user is asking for a redirect to the login page

    const [signedIn, setSignedIn] = useState(false);

    return (<>
    { 
        (signedIn === false)
            ? <Signup
                signedUpCallback={() => setSignedIn(true)}
                loginRedirect={loginRedirect} />
            : <AccountSetup accountSetupCallback={accountSetupCallback} />
    }
    </>);
}
 
export default SignupHub;
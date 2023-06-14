import './App.css';
import SignupHub from './Signup/SignupHub';

function App() {

    return (
        <SignupHub 
            accountSetupCallback={() => console.log('account set up')}
            loginRedirect={() => console.log('requested login page')}/>
    )
}

export default App;
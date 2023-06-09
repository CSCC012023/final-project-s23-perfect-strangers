import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <div className="form-section">
        <div className="title">
          <h3>Sign in</h3>
        </div>
        <div className="login-inner-form">
          <form method="POST">

            <div className="form-group form-box">
              <input type="text" id="email" className="input-text" placeholder="Email Address"/>
            </div>

            <div className="form-group form-box">
              <input type="text" id="password" className="input-text" placeholder="Password"/>
            </div>

            <div className="form-group">
              <button>Login</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

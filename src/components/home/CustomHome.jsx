import { useHistory } from 'react-router';

import logo from 'logo.svg';

function CustomHome() {
  const history = useHistory();
  return (
    <div className="container border my-5 text-center shadow">
      <h1 className="mt-3">This is Custom Home</h1>
      <p>Example by React</p>
      <button
        onClick={() => history.push('/')}
        className="btn btn-success my-3"
      >
        Go to Home
      </button>
      <div>
        <img src={logo} className="App-logo" height="256" alt="logo" />
      </div>
    </div>
  );
}

export default CustomHome;

import React from 'react';
import { getUsers } from './api.js'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  async function apiTest() {
    let data = await getUsers();
    return data;
  }

  let data = apiTest();
  console.log(data);
  return (
    <div>
      <header>
        <div className="auth-wrapper">
          <Login />
        </div>
      </header>
      <div className="auth-wrapper">
        <h1 className="mt-2">Inscription</h1>
        <p>C'est gratuit (et ça le restera toujours)</p>
        <SignUp />
      </div>
    </div>
  );
}

export default App;

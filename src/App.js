import React, { useState, useEffect } from 'react';

import MainHeader from './Components/MainHeader/MainHeader';
import  Login from './Components/Login/Login';
import Home from './Components/Home/Home';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const userLoggedInStatsInBrowser = localStorage.getItem('isLoggedIn');
  
  useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === '1') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userLoggedInStatsInBrowser]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', '0');
  };


  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}      
      </main>
    </React.Fragment>
  );
}

export default App;

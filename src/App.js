import React, { useState, useEffect } from 'react';

import MainHeader from './Components/MainHeader/MainHeader';
import  Login from './Components/Login/Login';
import Home from './Components/Home/Home';

// importing contexts
import AuthContext from './Components/Store/Auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const userLoggedInStatsInBrowser = localStorage.getItem('isLoggedIn');

    if(userLoggedInStatsInBrowser === '1') {
      setIsLoggedIn(true);
    }
  }, []);

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
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
    }}>
        <MainHeader />
          <main>
            {!isLoggedIn && <Login onLogin={loginHandler} />}
            {isLoggedIn && <Home onLogout={logoutHandler} />}      
          </main>
      </AuthContext.Provider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

// this is the provider component
export const AuthContextProvider = (props) => {

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
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

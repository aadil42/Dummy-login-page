import React, { useContext } from 'react';

import MainHeader from './Components/MainHeader/MainHeader';
import  Login from './Components/Login/Login';
import Home from './Components/Home/Home';

// importing contexts
import AuthContext from './Components/Store/Auth-context';

function App() {
  const ctx = useContext(AuthContext);

  return (
      <React.Fragment>
        <MainHeader />
            <main>
              {!ctx.isLoggedIn && <Login />}
              {ctx.isLoggedIn && <Home />}      
            </main>
      </React.Fragment>
  );
}

export default App;

import React, { useState, useEffect, useReducer, useRef, useCallback} from 'react';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import history from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";
import NavBar from './containers/Navbar';
import Home from './containers/Home';
import ViewUser from './containers/ViewUser';

const App : React.FC = () => {
  //const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();
  

return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar/>
        </header>
        <body>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/*todos los demas componentes deben tener Home abajo*/}
          <Route path="/profile" component={ViewUser}/>
        </Switch>
        </body>
      </Router>
    </div>
  );
}

/* volver a poner
     <Switch>
        <Route path="/" exact />
        <Route exact path="/startSession" component={ConfiguredHome} />
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/Home" component={Home} />
      </Switch>
*/
export default App;



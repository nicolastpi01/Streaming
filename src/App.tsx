import React, { useState, useEffect} from 'react';
import {Navbar, Nav, NavDropdown, Form, Col, Button, Row, Container,Alert, FormControl} from 'react-bootstrap';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Home, {Props as HomeProps} from './containers/Home';
import NewUser from './containers/Register'
import { BrowserRouter, Link } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import { object } from 'prop-types';
import Register from './containers/Register';
import NavBar from './containers/Navbar';

const App : React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, loading, auth0Client } = useAuth0();
  const [expand, setExpand] = React.useState<boolean>(false);
  const [estadoAlerta, setEstadoAlerta] = React.useState<string>("Ok");
  
  
  const NavBarAuth0 = () => <>
      <Form inline>
  
        {!isAuthenticated && (
          <Button variant="outline-light" onClick={() =>
             
            loginWithRedirect({})}>Log in</Button>
        )}
  
        {isAuthenticated && 
        <Button variant="outline-light" onClick={() => logout()}>Log out</Button> }



        {!isAuthenticated && 
         <Link to="/profile"><Button variant="outline-light">Perfil</Button></Link>
         } 
         
      </Form>
  </>

  function ConfiguredHome(props: Partial<HomeProps> = {}) {
    const defaultProps: HomeProps = {
      onSubmit(msj) {
        /*
        if(msj!="0"){
          setEstadoAlerta("Ok");
        }
        else{
          setEstadoAlerta("Bad");
        }
        setExpand(true);*/
        //console.log(msj);
      },
      onGETSugestions(sugerencia) {
        /*if(sugerencia=="ok"){
          setEstadoAlerta("Ok");
        }
        else{
          setEstadoAlerta("Bad");
        }
        setExpand(true);*/
        //console.log(sugerencia);
      },
      onGETVideos(log) {
        /*if(log=="ok"){
          setEstadoAlerta("Ok");
        }
        else{
          setEstadoAlerta("Bad");
        }
        setExpand(true);*/
        //console.log(log);
      },
    };
    //return (<Home {...defaultProps} {...props} />);
  }

  if (loading === undefined ) {
    return <p>Cargando.... </p> ;
  }

  const AlertOk = () => (
  <Alert  variant={'success'}>
    Todo Ok
  </Alert>);

  const AlertBad = () => (
  <Alert  variant={'danger'}>
    Algo salio mal ;(
  </Alert>);

  return (
    <div className="App">
      <Router history={history}>
        <header>
          <NavBar/>
        </header>
        
        <Switch>
          <Route path="/" exact/>
          <Route path="/profile" component={Register} />
        </Switch>
      </Router>
      <body>
        <Home/>
      </body>
    </div>

    /*
     <Switch>
        <Route path="/" exact />
        <Route exact path="/startSession" component={ConfiguredHome} />
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/Home" component={Home} />
      </Switch>
    */
  );

}

export default App;



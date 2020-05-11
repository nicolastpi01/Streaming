import React, { useState } from 'react';
import {Navbar, Nav, NavDropdown, Form, Col, Button, Row, Container} from 'react-bootstrap';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Home from './containers/Home';
import NewUser from './containers/Register'
import { BrowserRouter, Link } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import { object } from 'prop-types';
import Register from './containers/Register';

const App : React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [expand, setExpand] = React.useState<boolean>(false);
  const { loading } = useAuth0();
  
  const NavBarAuth0 = () => <>
      <Form inline>
  
        {!isAuthenticated && (
          <Button variant="outline-light" onClick={() => loginWithRedirect({})}>Log in</Button>
        )}
  
        {isAuthenticated && <Button variant="outline-light" onClick={() => logout()}>Log out</Button>}
      </Form>
  </>

  if (loading === undefined ) {
    return <p>Cargando.... </p> ;
  }

  return (<>
    <Row className="App">
      <Router history={history}>
        <Container className="flex flex-grow-4" fluid>
          <Navbar bg="dark" variant="light" >
            <Navbar.Brand className="sm" onClick={()=>history.push("home")} >Home</Navbar.Brand>
            {isAuthenticated && (
              <Navbar.Brand className="sm" onClick={()=>history.push("profile")}>Profile</Navbar.Brand>
            )}
            <NavBarAuth0/>
          </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>

      </Container>
      </Router>
    </Row>
    </>);
}

export default App;

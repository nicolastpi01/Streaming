import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Row, Container, Col} from 'react-bootstrap';
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

const NavBarAuth0 = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {/* NEW - add a link to the home and profile pages */}
      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  );
};

const App : React.FC = () => {
  const [expand, setExpand] = React.useState<boolean>(false);
  const { loading } = useAuth0();


  if (loading === undefined ) {
    return <p>Cargando.... </p> ;
  }

  return <>
    <Container className="flex flex-grow-4 App" fluid >
      <Router history={history}>
          <Navbar className="row" bg="dark" variant="light" >
            <Col lg={4} className="d-flex justify-content-left">
              <Navbar.Brand className="sm" href="#home">Home</Navbar.Brand>
            </Col>
            <Col lg={true}>
              <Form inline className="d-flex justify-content-center">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Col>
            <Col lg={true} className="d-flex justify-content-right">
              <NavBarAuth0 />
            </Col>
          </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
      </Container>
    </>
}

export default App;

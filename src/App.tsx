import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Row, Container} from 'react-bootstrap';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Home from './containers/Home';
import { BrowserRouter, Link } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";
import { object } from 'prop-types';

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

  return (<>
    <Row className="App">
      <Router history={history}>
        <Container className="flex flex-grow-4" fluid>
          <NavBarAuth0 />
          <Navbar bg="dark" variant="light" >
            <Navbar.Brand className="sm" href="#ome">Home</Navbar.Brand>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar>
        </Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </Row>
    </>
  );
}

export default App;

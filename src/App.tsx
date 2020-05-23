import React, { useState, useEffect} from 'react';
import {Navbar, Nav, NavDropdown, Form, Col, Button, Row, Container,Alert} from 'react-bootstrap';
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

const App : React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [expand, setExpand] = React.useState<boolean>(false);
  const [estadoAlerta, setEstadoAlerta] = React.useState<string>("Ok");
  const { loading } = useAuth0();
  
  const NavBarAuth0 = () => <>
      <Form inline>
  
        {!isAuthenticated && (
          <Button variant="outline-light" onClick={() => loginWithRedirect({})}>Log in</Button>
        )}
  
        {isAuthenticated && <Button variant="outline-light" onClick={() => logout()}>Log out</Button>}
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
    return (<Home {...defaultProps} {...props} />);
  }
/*
  useEffect(() => {
    let interval:any= null;
    if (expand) {
      interval = setInterval(() => {
        setExpand(false);
        clearInterval(interval)
      }, 1000);
    } //else clearInterval(interval);
    //return () => clearInterval(interval);
  }, [expand]);
*/
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
          <Route exact path="/" component={ConfiguredHome} />
          <Route path="/register" component={Register}/>
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
        {!expand? <></>: (estadoAlerta=="ok"?
          AlertOk() : AlertBad() 
        )}
      </Container>
      </Router>
    </Row>
    </>);
}

export default App;

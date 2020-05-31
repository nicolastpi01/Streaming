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
import Reproductor from './containers/Reproductor';
import ViewUser from './containers/ViewUser';

const App : React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [expand, setExpand] = React.useState<boolean>(false);
  const [estadoAlerta, setEstadoAlerta] = React.useState<string>("Ok");
  const { loading } = useAuth0();
  
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
          {/* 
          <Navbar bg="dark" variant="light" >
         
          
          <Navbar.Brand href="/register"> {/* Deberia ir al Home */}
          {/*
              <img
                src="iconW.ico"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Media logo"
              />
            </Navbar.Brand>
            <p style={{color : "white", marginTop : "1%" }}>Streaming</p>

            <Navbar.Brand className="sm" onClick={()=>history.push("home")} >Home</Navbar.Brand>
            {isAuthenticated && (
              <Navbar.Brand className="sm" onClick={()=>history.push("profile")}>Profile</Navbar.Brand>
            )}
            <Navbar.Brand className="sm" onClick={()=>history.push("media")} >YourMedia</Navbar.Brand>
            
            <NavBarAuth0/>
            
          </Navbar>
          */}


<Navbar bg="dark" variant="light">
  {/* 
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
  */}
    
    <Nav className="mx-auto"> // mr-auto aling left
    <Form inline>
    <Nav.Link href="/profile"><img
                src="iconW.ico"
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Media logo"
              /></Nav.Link>
      <Nav.Link href="/profile"><p style={{color : "white", marginTop : "16px"}}>Streaming</p></Nav.Link>
      </Form>
    <Navbar.Brand className="sm" onClick={()=>history.push("media")} >YourMedia</Navbar.Brand>
    </Nav>
    

    <Form inline>
    
      {!isAuthenticated && (
          <Button variant="outline-light" onClick={() =>
             loginWithRedirect({})}>Log in</Button>
      )}

      {isAuthenticated && (
          <Nav.Link href="/Home"><Button variant="outline-light" onClick={() =>
             loginWithRedirect({})}>Home</Button></Nav.Link>
      )}

      {isAuthenticated && (
          <Button variant="outline-light" onClick={() =>
              logout()}>Log Out</Button>
      )}
      
    </Form>
  </Navbar>


        <Switch>
          <Route exact path="/startSession" component={ConfiguredHome} />
          <Route path="/video" component={Reproductor}/>
          <Route path="/register" component={Register}/>
          <Route path="/media" component={ViewUser}/>
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/Home" component={Home} />
        </Switch>
        {!expand? <></>: (estadoAlerta==="ok"?
          AlertOk() : AlertBad() 
        )}
      </Container>
      </Router>
    </Row>
    </>);
}

export default App;

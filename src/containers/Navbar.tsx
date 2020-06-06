import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Navbar, Form, Nav, Button } from "react-bootstrap";


const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
return (

<Navbar bg="dark" variant="light">
    
    {/* mx-auto aling left */}
    <Nav className="mr-auto"> 
    <Form inline>
    <Nav.Link href="/"><img
              src="iconW.ico"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Media logo"
            /></Nav.Link>
    <Nav.Link href="/"><p style={{color : "white", marginTop : "16px"}}>Streaming</p></Nav.Link>
    </Form>
    </Nav>
  

    <Form inline>
  
    {!isAuthenticated && (
        <Button variant="outline-light" onClick={() =>
           loginWithRedirect({})}>Log in</Button>
    )}

          

    {isAuthenticated && (
        <Button variant="outline-light" onClick={() =>
            logout()}>Log Out</Button>
    )}

    
    {!isAuthenticated && (
          <Nav.Link href="/Profile"><Button variant="outline-light">Home</Button></Nav.Link>
      )}
    
    </Form>
    </Navbar>  
    );
  };
  
  export default NavBar;
  
  
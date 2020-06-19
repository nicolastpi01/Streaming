import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Navbar, Form, Nav, Button } from "react-bootstrap";
import history from "../utils/history";
import Autosuggest, { SuggestionsFetchRequested } from 'react-autosuggest';
import { searchSugestions } from "../APIs/mediaAPI";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [search, setSearch] = useState<string>("")


    // Teach Autosuggest how to calculate suggestions for any given input value.
    /*
    const getSuggestions = (value : string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }; */


    

    // Autosuggest will call this function every time you need to update suggestions.
    const onSuggestionsFetchRequested = (request : any) => {
        setSearch(request)
        getSuggestions();
        //setSuggestions([])
    }

    // Llama a la API para obtener las sugerencias
    const getSuggestions = async () => {
        searchSugestions(search).then(suggestions =>{
          setSuggestions(suggestions)
            }).catch((e:any) => {
            console.log("ERROR BUSCANDO LAS SUGERENCIAS" + e);
            });
    }

    
    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const onChanged = (event: any,  newValue: any ) => {
        setSearch(newValue)
    }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Type a programming language',
        value: '',
        onChange: onChanged
    }

    // Use your imagination to render suggestions.
    const renderSuggestion = (suggestion : string) => (
        <div>
            {suggestion}
        </div>
    )

    const suggestion =  ['hola','chau','nos vimos','perri']
    

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = (suggestion: string) => suggestion;

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


    
    <Nav className="mx-auto" >
    <Form inline>
    <Autosuggest
        suggestions={suggestion}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
    />
    <input type="submit" value="&#128269;" data-testid="busqueda-recomendaciones-boton"/>
    </Form>
    </Nav>
  

    <Form inline>

    
  
    {!isAuthenticated && (
        <Button variant="outline-light" onClick={() =>
           loginWithRedirect({})}>Log in</Button>
    )}

          

    {isAuthenticated && (<>
        <Button variant="outline-light" onClick={() =>
            logout()}>Log Out</Button>
        <Navbar.Brand className="sm" onClick={()=>history.push("/profile")} >
            <Button variant="outline-light">Profile</Button>
        </Navbar.Brand>
        </>
    )}

    
    {!isAuthenticated && (
        <Navbar.Brand className="sm" onClick={()=>history.push("/")} >
            <Button variant="outline-light">Home</Button>
        </Navbar.Brand>
      )}
    
    </Form>
    </Navbar>  
    );
  };
  
  export default NavBar;
  
  
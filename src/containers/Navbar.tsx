import React, { useState, Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Navbar, Form, Nav, Button, Dropdown } from "react-bootstrap";
import history from "../utils/history";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { searchSugestions } from "../APIs/mediaAPI";
import DropdownToggle from "react-bootstrap/DropdownToggle";


  /*
                <><Autocomplete

    value={value}

    onChange={(event: any, newValue: Film | null) => {
      setValue(newValue);
      // Llama al sever para buscar el video
    } }
    inputValue={inputValue}

    onInputChange={(event, newInputValue) => {

      const inputValue = newInputValue.trim().toLowerCase();

      const result = top100Films.filter(movie => movie.title.toLowerCase().includes(inputValue)
      );

      // el result sale de llamar al server
      setInputValue(newInputValue);
      setSuggestions(result);

    } }

    id="combo-box-demo"

    options={suggestions}

    getOptionLabel={(option: Film) => option.title}
    style={{ width: 300 }}
    renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />} />

    */
  
//const filter = createFilterOptions<Film>();

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    

    //const [suggestions, setSuggestions] = useState<Film[]>([]);
    //const [value, setvalue] = useState<string>('');
    //const [value, setValue] = useState<Film | null>(); // el objeto 
    const [inputValue, setInputValue] = useState(''); // el string de busqueda

    // Llama a la API para obtener las sugerencias
    /*
    const getSugestions = async () => {
      searchSugestions(search).then(sugestions =>{
        setSuggestions(sugestions)
      }).catch((e) => {
        console.log("ERROR BUSCANDO LAS SUGERENCIAS" + e);
      });
    }¨*/

    


return (
<div className="nav-container">
<Navbar bg="dark" variant="light" expand="sm">

    
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

    <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <Nav.Item>
                  <Button
                  variant="outline-light"
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </Nav.Item>
              )}
              {isAuthenticated && (
                < Dropdown >
                  <DropdownToggle id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <Dropdown.Menu>
                    <Dropdown.Item >{user.name}</Dropdown.Item>
                    <Dropdown.Item
                      //tag={RouterNavLink}
                      //to="/profile"
                      onClick={()=>history.push("profile")}
                      className="dropdown-profile"
                      //activeClassName="router-link-exact-active"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="qsLogoutBtn"
                      onClick={() => logout()}
                    >
                      {/*<FontAwesomeIcon icon="power-off" className="mr-3" /> */} Log
                      out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>



    
    {/* 
    <Nav className="mx-auto">
    <Form inline>
   
    <Autocomplete
      value={value}
    
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setInputValue(newValue)
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setInputValue(newValue.inputValue)
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={top100Films} 
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: 400, backgroundColor: "white" }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" variant="outlined" />
      )}
    />
    
    <input type="submit" value="&#128269;" data-testid="busqueda-recomendaciones-boton"  style={{ height: 60, width: 60  }}/>
    
    </Form>
    
    </Nav>
  */}

{/* 
    <Form inline>

    
  
    {!isAuthenticated && (
        <Button variant="outline-light" onClick={() =>
           loginWithRedirect({})}>Log in</Button>
    )}

  {  
   user && user.picture &&
  <Fragment>
    <div className='row'>
      <img src={user.picture} alt="Perfil" width="50" height="50" style={{borderRadius:"50%" }} />
      
      <p className="userName" style={{color: "white"}}>{user.name}</p>
      
    </div>
      
    </Fragment>
}

          

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
    */}

    </Navbar>  
    </div>
    );
  };
  
  export default NavBar;
  
  
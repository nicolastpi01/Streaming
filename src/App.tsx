import React, { useState, useEffect, useReducer, useRef, useCallback} from 'react';
import {Navbar, Nav, NavDropdown, Form, Col, Button, Row, Container,Alert, FormControl} from 'react-bootstrap';
import './App.css';
import { Switch, Route, Router} from 'react-router';
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
//import Home, {Props as HomeProps} from './containers/Home';
import NewUser from './containers/Register'
import { BrowserRouter, Link } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-spa";

import Register from './containers/Register';
import NavBar from './containers/Navbar';
import { VideosResult } from './types/VideosResult';
import Home from './containers/Home';

const App : React.FC = () => {
  //const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();
  

  

  
  //const [imgData, imgDispatch] = useReducer(imgReducer,{ page:[], offset: 0, size: 0, fetching: true})
  // next code block goes here


  // make API calls
  /*
  useEffect(() => {
    imgDispatch({ type: 'FETCHING_IMAGES', fetching: true })
    fetch(`https://localhost:5001/api/video/videos?page=0`)
      //.then(data => data.json())
      .then(page => {
        imgDispatch({ type: 'STACK_IMAGES', page })
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false })
      })
      .catch(e => {
        // handle error
        imgDispatch({ type: 'FETCHING_IMAGES', fetching: false })
        return e
      })
  }, [ imgDispatch ]) // , pager.page
  */


  

 

  

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
       
       {/* 
      <div id='images' className="container">
      <div className="row">
        <h1>{imgData.offset}</h1> 
        <h1>{imgData.page.size}</h1>
        {imgData.page.map((image: VideosResult) => {
          const { author, download_url } = image
          const { indice, nombre, descripcion, autor } = image
          return (
            <div key={image.indice} className="card">
              <div className="card-body ">
                  <p>{image.nombre}</p>
              
              { 
                <img
                  alt={author}
                  className="card-img-top"
                  src={download_url}
                />
              }

              </div>
              <div className="card-footer">
                <p className="card-text text-center text-capitalize text-primary">Shot by: {image.autor}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>

    {imgData.fetching && (
      <div className="text-center bg-secondary m-auto p-3">
        <p className="m-0 text-white">Getting images</p>
      </div>
    )}
    */}
      {/* <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef}></div> */}
      
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



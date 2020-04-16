import React from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router';
import Home from './containers/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    </BrowserRouter>
      
    </div>
  );
}

export default App;

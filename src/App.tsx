import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Row, Container} from 'react-bootstrap';
import './App.css';
import { Switch, Route } from 'react-router';
import Home from './containers/Home';
import { BrowserRouter } from 'react-router-dom';
import { object } from 'prop-types';


const App : React.FC = () => {
  const [expand, setExpand] = React.useState<boolean>(false);
  
  return (<>
    <Container className="flex flex-grow-4" fluid>
    <Navbar bg="dark" variant="light" >
      <Navbar.Brand className="sm" href="#ome">Home</Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar>
    </Container>

    <Row className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Row>
    </>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
import { Container, Row } from 'react-bootstrap';
import MyNavbar from './components/navbar';
import { MyMain } from "./components/mainContent";
import { filters } from "./components/sidebar";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { useState } from 'react';

function CheckError(props) {

  if (filters.find(({ filterId }) => filterId === props.id) !== undefined) {
    return <MyMain filterState={props.id} action={props.action} open={props.open} />;
  } else {
    return <Redirect to="/list/all" />;
  }
}

function App() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <Router>
        <MyNavbar open={open} setOpen={setOpen} />
        <Container fluid>
          <Row vheight="100">
            <Switch>
              <Route exact path="/list/:id/:action" render={({ match }) => (
                <CheckError id={match.params.id} action={match.params.action} open={open} />
              )} />
              <Route exact path="/list/:id" render={({ match }) => (
                <CheckError id={match.params.id} open={open} />
              )} />
              <Route path="/" >
                <Redirect to="/list/all" />
              </Route>
            </Switch>
          </Row>
        </Container>
      </Router>
    </>
  );
}

export default App;
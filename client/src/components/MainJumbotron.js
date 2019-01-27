import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

import GoogleAuth from './GoogleAuth';

/* Content for the home page of our app */
class MainJumbotron extends Component {

  render() {
    return (
      /* Jumbotron displays app name and a short detail */
      <Jumbotron
        className="d-flex flex-column justify-content-center align-items-center h-100">
        <h1>abierto</h1>
        <p>Get honest feedback and reviews!</p>

        {/* Signin/logout component */}
        <GoogleAuth />

      </Jumbotron >
    );
  }
}

export default MainJumbotron;
import React, { Component } from 'react';

import GoogleAuth from './GoogleAuth';

/* Content for the home page of our app */
class HomePage extends Component {

  render() {
    return (
      /* Jumbotron displays app name and a short detail */
      <div
        className="d-flex flex-column justify-content-center align-items-center h-100 app_theme">
        <h1>abierto</h1>
        <p className="color-light">Get honest feedback and reviews!</p>

        {/* Signin/logout component */}
        <GoogleAuth />

      </div >
    );
  }
}

export default HomePage;
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import MainJumbotron from './MainJumbotron';
import Messages from './Messages';
import Footer from './Footer';

// Get the stylesheet for our app
import '../App.css';

/* Starting point of our app */
class App extends Component {

  render() {
    return (
      // The container `div`'s height should cover the whole page
      // to make the main content cover whole page
      // and footer stick to its bottom
      <div className="d-flex flex-column h-100">
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="main-content">
          {/*
            * Route for `/`(root)
            *
            * If user is logged in as well as verified, redirect to `/messages` path
            * Otherwise, Show the main page and ask to login/wait for verification
            */}
          <Route exact path="/" render={() => (
            this.props.loggedIn && this.props.verified ? (
              // Logged in and verified, redirect to `/messages`
              <Redirect to="/messages" />
            ) : (
                // Not logged in/verified, stay in this page and ask to login
                <MainJumbotron />
              )
          )} />

          {/*
            * Route for `/messages`
            *
            * If user is logged in as well as verified, show the recieved messages
            * Otherwise, redirect to home page and ask to login
            */}
          <Route exact path="/messages" render={() => (
            this.props.loggedIn && this.props.verified ? (
              // Logged in and verified, show the messages recieved
              <Messages />
            ) : (
                // Not logged in/verified, redirect to home page
                <Redirect to="/" />
              )
          )} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Get the required props from the state
const mapStateToProps = state => {
  return {
    // If user is logged in
    loggedIn: state.loggedIn,
    // If user has been verified by the server
    verified: state.verified
  };
};

export default connect(
  /* State */
  mapStateToProps
)(App);
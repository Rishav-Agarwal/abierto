import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';

import PleaseWait from './PleaseWait';

/* This component shows the user profile */
class Profile extends Component {

  render() {
    return (
      // Bootstrap container for user profile
      <Container className="py-2 app_theme__card">
        {/* Row for profile */}
        <Row>
          {/* Column for profile */}
          <Col className="d-flex flex-column align-items-center">
            {
              // If user is logged in and defined, show the profile
              // Else, show please wait button
              this.props.user ? (
                // User logged in and defined, show the profile

                // Return react fragment as it eliminates extra `div`
                // which may unnecessarily nest the DOM tree
                <React.Fragment>
                  {/* Profile image with initial edge length of 72px
                    *
                    * Side length increases with screen size
                    */}
                  <Image
                    // Get the profile picture from user data
                    src={this.props.user.picture}
                    width="72"
                    height="72"
                    roundedCircle
                    className="profile__pic" />
                  {/* User's name and share button */}
                  <div className="text-center">
                    {/* User's name - from user data */}
                    <span className="h5 m-1 p-1">{this.props.user.name}</span>
                    {/* Share user profile button */}
                    <Button variant="outline-primary" className="p-1">
                      {/* Font awesome share image */}
                      <span className="m-1 profile__share">
                        <i className="fas fa-share-alt"></i>
                      </span>
                      <span className="m-1">Share</span>
                    </Button>
                  </div>
                  {/* Show the unique username */}
                  <p className="w-100 mb-0 text-center text-primary word-wrap-break">{this.props.user.username}</p>
                  {/* Show user's about me */}
                  <p className="color-light">{this.props.user.about}</p>
                </React.Fragment>
              ) : (
                  // User not loaded, show please wait button
                  <PleaseWait />
                )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

// Get the required props from the state
const mapStateToProps = state => {
  return {
    // The user data
    user: state.user
  };
};

export default connect(
  /* State */
  mapStateToProps
)(Profile);
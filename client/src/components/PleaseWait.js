import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

/*
 * It is displayed when we want our user to wait for some action to happen.
 *
 * Current usage-
 * 1. User logged in, but waiting for verification by server
 */
class PleaseWait extends Component {

  render() {
    return (
      // Return a button showing 'Please wait'
      <Button variant="secondary" disabled>Please Wait</Button>
    );
  }
}

export default PleaseWait;
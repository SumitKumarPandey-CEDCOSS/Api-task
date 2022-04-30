import React, { Component } from 'react'
import Login from './Component/login'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

export class Auth extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/auth/login" component={Login}></Route>
          <Redirect to="/auth/login" ></Redirect>
        </Switch>
      </>
    )
  }
}

export default Auth

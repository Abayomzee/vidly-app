import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/common/navbar";
import Movies from "./components/movies";
import Customers from "./components/pages/customers";
import Rentals from "./components/pages/rentals";
import NotFound from "./components/pages/not-found";
import LoginForm from "./components/pages/loginForm";
import RegisterForm from "./components/pages/registerForm";
import MovieForm from "./components/pages/movieForm";
import Logout from "./components/pages/logout";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    console.log("App - Component Mounting");
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const user = this.state.user;
    return (
      <Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={this.state.user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/movies" exact />
          <Redirect to="not-found" />
        </Switch>
      </Fragment>
    );
  }
}

export default App;

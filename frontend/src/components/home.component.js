import React, { Component } from "react";

import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
axios.defaults.withCredentials = true;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    // Setting up functions - set 'this' context to this class

    // Setting up state
    this.state = {
      redirect: null,
      loading_done: false,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/logged`)
      .then((res) => {
        // console.log(res);
        this.setState({ redirect: "/myProfile", loading_done: true });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ loading_done: true });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ redirect: "/login" });
  }
  onSubmit2(e) {
    e.preventDefault();
    this.setState({ redirect: "/register" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else if (this.state.loading_done) {
      return (
        <div className="form-wrapper">
          <Form onSubmit={this.onSubmit}>
            <Button size="lg" block="block" type="submit" className="button">
              Login
            </Button>
          </Form>

          <Form onSubmit={this.onSubmit2}>
            <Button size="lg" block="block" type="submit" className="button">
              Register
            </Button>
          </Form>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

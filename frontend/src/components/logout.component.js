import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from "react-router-dom";
axios.defaults.withCredentials = true;

export default class ObjList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      disabled: false
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({disabled: true})
    axios.post('http://localhost:5000/auth/logout')
      .then(res => { // only remove if complete successfully
        console.log(res)
        this.setState({ redirect: '/' })
      })
      .catch(err => { // if error, notify user
        console.log(err)
        alert(JSON.stringify(err))
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Button variant="danger" size="lg" disabled={this.state.disabled} block="block" type="submit">
          Logout
        </Button>
      </Form>
    </div>);

  }
}
import React, { Component } from "react";
import { Button, Divider, Modal, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  set_time,
  select_time,
  edit_toggle,
  user_selection
} from "./actions/actions";
import 'react-notifications/lib/notifications.css';
import times from './times';
import "./App.css";
import ModalComponent from "./components/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user: {
        selected: false
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(set_time(times));
  }

  pick_time = (id, hour, index) => {
    const { time } = this.props.schedule
    let current_user = time[index];

    this.setState({
      open: true,
      id,
      hour,
      index,
      current_user
    });

  };

  get_values = (event) => {
    const name = event.target.name;
    const values = event.target.value;

    this.setState({
      [name]: values
    });
  };


  submit_result = () => {
    const { hour, id, name, phoneNumber, index } = this.state;

    let user = {
      name,
      phoneNumber,
      id
    };

    this.edit_status(false)

    this.props.dispatch(select_time(id));
    this.props.dispatch(user_selection(user));
    NotificationManager.info(`You selected ${hour} `, "Yupppeeeee, you did");
    this.setState({
      open: false
    });
  };

  close = () => this.setState({ open: false })


  edit_status = (bool) => {
    this.props.dispatch(edit_toggle(!bool));
  };



  render() {
    const { open, current_user } = this.state;
    const { time, edit, size } = this.props.schedule;

    console.log("State: ", this.state)
    return (
      <div>
        {
          time ? time.map(({ hour, id, selected }, index) => (
            <div
              key={id}
              className={selected ? "selected hour" : "hour"}
              onClick={() => this.pick_time(id, hour, index)}
            >
              <p >Hour: {hour} </p>
            </div>
          )) : ""
        }


        <ModalComponent {...this.state }  { ...this.props.schedule } edit_status={this.edit_status} close = {this.close}>
          {
            current_user.selected && edit ? <Display {...this.state} /> : <Edit
              submit_result={this.submit_result}
              get_values={this.get_values}
            />
          }
        </ModalComponent>


        <NotificationContainer />
      </div>
    );
  }
}


const Display = ({ current_user: { hour, info: { name, phoneNumber } } }) => {


  return (
    <div>
      <h2>You picked!</h2>
      <h4>Name: {name}</h4>
      <p>Hour Selected: {hour} </p>
      <p>Phone number: {phoneNumber} </p>
    </div>
  );
};



const Edit = ({ submit_result, get_values }) => {

  return (
    <div>

      <Form size={"small"} >
        <Form.Group widths='equal'>
          <Form.Field
            label='Name'
            control='input'
            name="name"
            placeholder='Name...'
            onChange={get_values} />
          <Form.Field
            label='Phone number'
            control='input'
            name="phoneNumber"
            type="number"
            placeholder='(xxx) xxx-xxxx'
            onChange={get_values} />
        </Form.Group>
        <Button type='submit' onClick={submit_result}>Submit</Button>
        <Divider hidden />
      </Form>

    </div>
  );
}


const mapPropsToState = (state) => {
  return {
    schedule: state.schedule
  }
};

export default connect(mapPropsToState)(App);
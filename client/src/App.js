import React, { Component } from "react";
import { Button, Modal, Divider, Form } from 'semantic-ui-react';
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  set_time,
  select_time,
  edit_toggle
} from "./actions/actions";
import 'react-notifications/lib/notifications.css';
import times from './times';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(set_time(times));
  }

  pick_time = (id, hour) => {
    this.setState({
      open: true,
      id,
      hour
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
    const { hour, id } = this.state;
    this.props.dispatch(select_time(id));
    NotificationManager.info(`You selected ${hour} `, "Yupppeeeee, you did");
    this.setState({
      open: false,
      name: '',
      address: ''
    });
  };

  close = () => this.setState({ open: false })


  edit_status = (bool) => {
    this.props.dispatch(edit_toggle(!bool));
  };



  render() {
    const { open, size } = this.state;

    const { time, edit } = this.props.schedule;
    console.log("Props: ", this.props.schedule);
    console.log("State: ", this.state);

    return (
      <div>
        {
          time ? time.map(({ hour, id, selected }) => (
            <div
              key={id}
              className={selected ? "selected hour" : "hour"}
              onClick={() => this.pick_time(id, hour)}
            >
              <p >Time: {hour} </p>
            </div>
          )) : ""
        }


        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>
            Enter the your name and address
          </Modal.Header>
          <Modal.Content>
            {
              edit ? <Display /> : <Edit
                submit_result={this.submit_result}
                get_values={this.get_values}
              />
            }
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.edit_status(edit)}>
              {edit ? "Edit time" : "See time"}
            </Button>
          </Modal.Actions>
        </Modal>


        <NotificationContainer />
      </div>
    );
  }
}


const Display = ({ time, address }) => {
  return (
    <div>
      <h2>You picked!</h2>
      <p>Time: {time} </p>
      <p>Address: {address} </p>
    </div>
  );
};



const Edit = ({ submit_result, get_values }) => {

  return (
    <div>

      <Form size={"small"} >
        <Form.Group widths='equal'>
          <Form.Field
            label='First name'
            control='input'
            name="name"
            placeholder='Name...'
            onChange={get_values} />
          <Form.Field
            label='Last name'
            control='input'
            name="address"
            placeholder='Address...'
            onChange={get_values} />
        </Form.Group>
        <Button type='submit' onClick={submit_result}>Submit</Button>
        <Divider hidden />
      </Form>

    </div>
  );
}

// name and phone number

const mapPropsToState = (state) => {
  return {
    schedule: state.schedule
  }
};

export default connect(mapPropsToState)(App);
import React, { Component } from "react";
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
import DisplaySchedule from "./components/DisplaySchedule";
import Form from "./components/Form";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user: {
        selected: false,
        edit:false
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
    const { hour, id, name, phoneNumber } = this.state;
    const { dispatch } = this.props

    let user = {
      name,
      phoneNumber,
      id
    };


    dispatch(select_time(id));
    dispatch(user_selection(user));
    NotificationManager.info(`You selected ${hour} `, "Yupppeeeee, you did");
    this.setState({ open: false });
    this.edit_status(false)
    

    console.log("State On Submit: ", this.state)
  };

  close = () => {
    this.edit_status(false)
    this.setState({ open: false, current_user:{ edit: false} })
  };


  edit_status = (bool) => {
    const {selected, id} = this.state.current_user;
    if(selected){
      this.props.dispatch(edit_toggle(bool, id));
    } else{
      NotificationManager.error(`Enter your info in order to be able to see it`);
    }
  };



  render() {
    const { current_user : { edit, selected }} = this.state;
    const { time } = this.props.schedule;
    console.log("State: ", this.state);

    return (
      <div>
        {
          time ? time.map(({ hour, id, selected }, index) => (
            <div
              key={id}
              className={selected ? "selected hour" : "hour"}
              onClick={() => this.pick_time(id, hour, index)}
            >
              <p >{hour} </p>
            </div>
          )) : ""
        }


        <ModalComponent {...this.state }  { ...this.props.schedule } edit_status={this.edit_status} close={this.close}>
          {
            selected && !edit ? <DisplaySchedule {...this.state} /> : <Form
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




const mapPropsToState = (state) => {
  return {
    schedule: state.schedule
  }
};

export default connect(mapPropsToState)(App);
import React, { Component } from "react";
import { connect } from "react-redux";
import { 
  NotificationContainer, 
  NotificationManager 
} from 'react-notifications';
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
import {formatPhoneNumber} from "./utils";


export class App extends Component {
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

  /**
   * Keep track of the selected user in the state
   * and so we can display info in the modal
   * @param id
   * @param hour
   * @param index
   */
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

  /**
   * Get inputs such as name and phone number
   * @param event
   */
  get_values = (event) => {
    const name = event.target.name;
    let values = event.target.value;

    

    if(name === "phoneNumber" && formatPhoneNumber(values).length === 14){
      values = formatPhoneNumber(values)
      console.log("State: ", this.state);
    }

    this.setState({
      [name]: values
    });
    
  };

  /**
   * Add user info under the time selection
   * Once clicked, modal will closed
   * Edit mode reset to false so next time they click
   * they can view their scheduled info
   * Keep track that user selected a time
   * Pops up a notification to confirm that time has successfully been selected
   */
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
  };




  /**
   * Close the modal on click anywhere
   * Reset edit mode to false so user can see
   * their info next time they click
   */
  close = () => {
    this.edit_status(false)
    this.setState({ open: false, current_user:{ edit: false} })
  };


  /**
   * Toggle the edit mode
   * User not allowed to see the view info
   * If they haven't filled out the form. 
   * Error notifications will appear
   * @param bool
   */
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
    return (
      <div className = "hour__container">
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
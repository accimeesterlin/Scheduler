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
  user_selection,
  set_info
} from "./actions/actions";
import {
  Header,
  Footer,
  Modal,
  Form,
  DisplaySchedule,
  Hour
} from "./components/index";
import 'react-notifications/lib/notifications.css';
import times from './times';
import "./App.css";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user: {
        selected: false,
        edit: false
      },
      visible: false
    };
  }

  componentDidMount() {
    this.props.set_time(times);
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
    this.validate_phone(name, values);
  };


  validate_phone = (name, values) => {
    const { id } = this.state;

    if (name === "phoneNumber") {
      if (values.length <= 10) {
        this.props.set_info("phoneNumber", values, id);
      } else {
        NotificationManager.error("You have exceeded your phone number limit");
      }
    } else {
      this.props.set_info("name", values, id);
    }
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
    try {
      const { hour, id, current_user: { info: { name, phoneNumber } } } = this.state;
      const { select_time, user_selection } = this.props

      let user = {
        name,
        phoneNumber,
        id
      };
      select_time(id)
      user_selection(user)
      NotificationManager.info(`You selected ${hour} `, "Yupppeeeee, you did");
      this.setState({ open: false });
      this.edit_status(false)
    } catch (error) {
      NotificationManager.error("Input should not be empty, try again");
    }
  };




  /**
   * Close the modal on click anywhere
   * Reset edit mode to false so user can see
   * their info next time they click
   */
  close = () => {
    this.edit_status(false)
    this.setState({ open: false, current_user: { edit: false }, visible: false })
  };


  /**
   * Toggle the edit mode
   * User not allowed to see the view info
   * If they haven't filled out the form. 
   * Error notifications will appear
   * @param bool
   */
  edit_status = (bool) => {
    const { selected, id } = this.state.current_user;
    if (selected) {
      this.props.edit_toggle(bool, id);
    } else {
      NotificationManager.error(`Enter your info in order to be able to see it`);
    }
  };



  render() {
    const { current_user: { edit, selected } } = this.state;
    const { time } = this.props.schedule;

    return (
      <div className="wrapper">

        <Header />
        <Hour time={time} pick_time={this.pick_time}>
          <Modal
            edit_status={this.edit_status}
            close={this.close}
            {...this.state }
            { ...this.props.schedule }
          >
            {
              selected && !edit ? <DisplaySchedule {...this.state} /> : <Form
                submit_result={this.submit_result}
                get_values={this.get_values}
                {...this.state}
              />
            }
          </Modal>

          <NotificationContainer />
        </Hour>

        <Footer />
      </div>
    );
  }
}




const mapPropsToState = (state) => {
  return {
    schedule: state.schedule
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    set_time: (times) => dispatch(set_time(times)),
    select_time: (id) => dispatch(select_time(id)),
    edit_toggle: (bool, id) => dispatch(edit_toggle(bool, id)),
    set_info: (name, value, id) => dispatch(set_info(name, value, id)),
    user_selection: (user) => dispatch(user_selection(user))
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App);
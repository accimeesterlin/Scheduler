import React from 'react';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  set_time,
  select_time,
  edit_toggle,
  user_selection
} from "./actions";

configure({ adapter: new Adapter() })

describe("Testing Actions creators", () => {

  /**
   * Selecting the time by ID
   */
  it("Selecting the time by ID", () => {
    const id = "time_9_AM";
    const expectedAction = {
      type: "TIME_SELECTED",
      id
    };
    expect(select_time(id)).toEqual(expectedAction);
  });

  /**
   * Setting the time
   */
  it("Setting the time", () => {
    const time = "9:00 AM";
    const expectedAction = {
      type: "TIME",
      time
    };

    expect(set_time(time)).toEqual(expectedAction);
  });


  /**
   * Setting the user selection
   */
  it("Setting the user selection", () => {
    const user = {
      name: "Esterling Accime",
      phoneNumber: "404 825 3444",
      id: "time_5_PM"
    };

    const expectedAction = {
      type: "USER_SELECTION",
      info: user
    };

    expect(user_selection(user)).toEqual(expectedAction);
  });

  /**
   * Toggle the edit boolean
   */
  it("Toggle the edit boolean", () => {
    let id = "time_5_PM";
    let bool = true;

    const expectedAction = {
      type: "EDIT_TOGGLE",
      bool,
      id
    };
    expect(edit_toggle(bool, id)).toEqual(expectedAction);
  });

})

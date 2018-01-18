import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import connectedApp, { App } from "./App";

configure({ adapter: new Adapter() })

describe("Testing Actions creators", () => {


  const props = {
    schedule: {
      time: [],
      size: "small"
    },
    set_time: () => { }
  };


  /**
   * Making sure that the component actually renders
   */
  it("Checking if component rendered", () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...props} />, div);
  });




})

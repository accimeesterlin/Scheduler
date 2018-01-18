import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as actions from "./actions/actions";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import { createStore} from "redux";
import connectedApp, { App } from "./App";

configure({ adapter: new Adapter() })

describe("**** => <App />", () => {

  // const initialState = {};
  // const mockStore = configureStore();

  // let wrapper, store;

  // beforeEach(() => {
  //   store = mockStore(initialState);
  //   wrapper = mount(<Provider store = {store}> <App /> </Provider>);
  // });

  const props = {
    schedule:{
      time: [],
      size: "small"
    }
  }
  
  

  it("Checking if component rendered", () => {
    const div = document.createElement('div');
    ReactDOM.render(<App {...props}/>, div);
  });
})

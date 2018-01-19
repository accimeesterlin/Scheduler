import React from 'react';
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reducer from "./schedule";
import times from "../times";
configure({ adapter: new Adapter() })


describe("Testing reducers", () => {
    const initial_state = {
        size: "small",
        time: [{
            id: "time_5_PM"
        }]
    };

    it("Should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            size: "small"
        });
    });

    it("Setting the times", () => {
        const time = times;

        expect(reducer({}, {
            type: "TIME",
            time
        })).toEqual({
            time
        });
    });

    it("Setting the time selected boolean to true", () => {
        const id = "time_5_PM";
        const time = times;
        expect(reducer(initial_state, {
            type: "TIME_SELECTED",
            id
        })).toEqual({
            ...initial_state,
            time: [{
                id,
                selected: true
            }]
        });
    });


    it("Toggle equal to true", () => {
        const id = "time_5_PM";
        const bool = true;

        expect(reducer(initial_state, {
            type: "EDIT_TOGGLE",
            bool,
            id
        })).toEqual({
            ...initial_state,
            time: [...initial_state.time]
        });
    });


    it("Grabbing the user selection, and store it", () => {

        const info = {
            name: "Esterling Accime",
            phoneNumber: "404 825 3444",
            id: "time_5_PM"
        }
        expect(reducer(initial_state, {
            type: "USER_SELECTION",
            info
        })).toEqual({
            ...initial_state,
            time: [...initial_state.time]
        });
    });
});
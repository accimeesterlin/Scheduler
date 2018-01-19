import React from 'react';
import "./Hour.css";
import { formatPhoneNumber } from "../../utils";

const Hour = ({
    schedule: {
        time,
    city,
    selected
    },
    pick_time,
    children,
    active
}) => {
    return (
        <div className="main full_layout">

            <div>
                {
                    time ? time.map(({ hour, id, selected }, index) => (
                        <div
                            key={id}
                            className={selected ? "selected hour" : "hour"}
                            onClick={() => pick_time(id, hour, index)}
                        >
                            <p >{hour} </p>
                        </div>
                    )) : ""
                }
            </div>
            <div className="display_appointments">
                <h3>{city }</h3>

                {
                    time ? time.map(({ selected, info, hour }, index) => (
                        selected ? <Confirmed {...info} hour = {hour} key = {index} /> : ''
                    )) : ""
                }

                <p>{active ? "" : "No Appointments selected"}</p>

            </div>
            {children}
        </div>
    );
}

const Confirmed = ({ name, phoneNumber, hour }) => {
    return (
        <div >
            <p>{name + " | " + hour} </p>
            <p>{formatPhoneNumber(phoneNumber)} </p>
        </div>
    );
}

export default Hour;
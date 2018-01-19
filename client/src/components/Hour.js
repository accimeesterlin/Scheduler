import React from 'react';


const Hour = ({
    time,
    pick_time,
    children
}) => {
    return (
        <div className="main">
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
            {children}
        </div>
    );
}

export default Hour;
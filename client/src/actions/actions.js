

// Verified *2
export const set_time = (time) => {
    return {
        type:"TIME",
        time
    }
};


// Verified
export const select_time = (id) => {
    return{
        type:"TIME_SELECTED",
        id
    }
};

export const edit_toggle = (bool, id) => {
    return{
        type:"EDIT_TOGGLE",
        bool,
        id
    }
};


// Verified
export const user_selection = (info) => {
    return {
        type:"USER_SELECTION",
        info
    }
};
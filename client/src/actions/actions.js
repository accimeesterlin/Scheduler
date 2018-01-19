

// Verified *2
export const set_time = (time) => {
    return {
        type:"TIME",
        time
    }
};


// Verified *2
export const select_time = (id) => {
    return{
        type:"TIME_SELECTED",
        id
    }
};


// Verified*2
export const edit_toggle = (bool, id) => {
    return{
        type:"EDIT_TOGGLE",
        bool,
        id
    }
};


// Verified *2
export const user_selection = (info) => {
    return {
        type:"USER_SELECTION",
        info
    }
};


export const set_info = (name, value, id) => {
    return {
        type:"SET_INFO",
        name,
        value,
        id
    }
};
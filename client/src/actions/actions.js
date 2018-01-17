

export const set_time = (time) => {
    return {
        type:"TIME",
        time
    }
};


export const select_time = (id) => {
    return{
        type:"TIME_SELECTED",
        id
    }
};

export const edit_toggle = (bool) => {
    return{
        type:"EDIT_TOGGLE",
        bool
    }
};


const initial_state = {
    active: false,
    edit: false,
    open: false,
    size: "small"
};

const schedule = (state = initial_state, action) => {

    switch (action.type) {
        case "TIME":
            return { ...state, time: action.time };
            break;

        case "TIME_SELECTED":
            return {
                ...state,
                time: state.time.map((element) => {
                    if(element.id === action.id){
                        element["selected"] = true;
                        return element;
                    } else {
                        return element;
                    }
                }),
                open:true
            };
            break;

        case "EDIT_TOGGLE":
            return {
                ...state,
                edit: action.bool
            }    
        default:
            return state;
    }
}

export default schedule;
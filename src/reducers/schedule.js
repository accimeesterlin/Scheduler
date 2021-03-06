

const initial_state = {
    size: "small"
};

const schedule = (state = initial_state, action) => {

    switch (action.type) {
        case "TIME":
            return { ...state, time: action.time };

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
                })
            };

        case "SET_INFO":
            return {
                ...state,
                time: state.time.map((element) => {
                    if(element.id === action.id){
                        element["info"] = {
                            ...element.info,
                            [action.name]: action.value
                        }
                        return element;
                    } else {
                        return element;
                    }
                })
            }

        case "EDIT_TOGGLE":
            return {
                ...state,
                time: state.time.map((element) => {
                    if(element.id === action.id){
                        element.edit = action.bool;
                        return element;
                    } else{
                        return element
                    }
                    
                })
            }   
            
        case "USER_SELECTION":
            return {
                ...state,
                time: state.time.map((element) => {
                    if(element.id === action.info.id){
                        element["info"] = {
                            ...action.info
                        }
                        return element;
                    } else{
                        return element;
                    }
                })
            }    
        case "GET_GEOLOCATION_FULFILLED":
            return {
                ...state,
                city: action.payload.data.city
            }

        default:
            return state;
    }
}

export default schedule;


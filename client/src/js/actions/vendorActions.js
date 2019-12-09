import actionTypes from "../constants/index";
import axios from "axios";

const getRestaurant = payload => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_RESTAURANT,
            payload: {
                id: payload.restaurant_id,
                name: payload.restaurant_name,
                address: payload.restaurant_address,
                zipcode: payload.zipcode,
                image: payload.restaurant_image,
                cuisine: payload.cuisine
            }
        });
    };
}

const getMenu = payload => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_MENU,
            payload: {
                menu: payload
            }
        })
    }
}

const editSection = payload => {
    return dispatch => {
        return axios.put("http://localhost:3001/restaurant/menu/section", payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_MENU,
                    payload: {
                        menu: response.data
                    }
                })
            }
        })
    }
}

const deleteSection = payload => {
    return dispatch => {
        return axios
            .put("http://localhost:3001/restaurant/menu/section/delete", payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_MENU,
                        payload: {
                            menu: response.data
                        }
                    });
                }
            });
    };
};

export {
    getRestaurant,
    getMenu,
    editSection,
    deleteSection,
};
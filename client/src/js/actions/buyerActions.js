import actionTypes from "../constants/index"
import axios from "axios";

const getResults = (payload, ownProps) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_SEARCH_RESULTS,
            payload: {
                search_results: payload
            }
        });
        ownProps.history.push("/results")
    }
}


const getRestaurantDetails = payload => {
    return dispatch => {
        return axios
            .get(`http://localhost:3001/restaurant/details/${payload.restaurant_id}`)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SET_BUYER_SELECTED_RESTAURANT,
                        payload: response.data
                    });
                }
            });
    };
};

export {
    getResults,
    getRestaurantDetails,
};
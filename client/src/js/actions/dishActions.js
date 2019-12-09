import actionTypes from "../constants/index";
import axios from "axios";
import {toast} from 'react-toastify';

const addDish = payload => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_DISH,
            payload
        });
        toast.success("Added to menu!");
    }
}

const updateDish = payload => {
    return dispatch => {
        return axios.post(`http://localhost:3001/dish/update`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.SET_DISH,
                    payload: response.data
                });
            }
        })
    }
}

const deleteDish = (payload, ownProps) => {
    return dispatch => {
        return axios.delete(`http://localhost:3001/dish/delete/${payload.dish_id}`, payload).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: actionTypes.CLEAR_DISH,
                    payload: {}
                })
                ownProps.history.push(`/${payload.user_id}/menu`)
            }
        })
    }
}

const getDish = payload => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_ITEM,
            payload
        });
    }
}

export {
    addDish,
    deleteDish,
    updateDish,
    getDish,
}
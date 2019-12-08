import actionTypes from "../constants/index";

const loginUser = (payload, ownProps) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_USER,
            payload
        });
        if (payload.type === 'Vendor') {
            ownProps.history.push(`/${payload.id}/account`);
        } else {
            ownProps.history.push(`/${payload.id}/search`);
        }
    }
}

const registerUser = (payload, ownProps) => {
    return dispatch => {
        dispatch({
            type: actionTypes.SET_USER,
            payload
        });
        if (payload.account_type === "Vendor") {
            ownProps.history.push(`/login-vendor`);
        } else {
            ownProps.history.push(`/login-user`);
        }
    }
}

// const updateUser = payload => {
//     console.log("In updateUser:", payload)
//     return dispatch => {
//         return axios.put(`http://localhost:3001/userUpdate/${payload.id}`, payload)
//             .then(response => {
//                 if (response.status === 200) {
//                     const userData = response.data.user;
//                     userData.update_success = true;
//                     dispatch({
//                         type: actionTypes.SET_USER,
//                         payload: userData
//                     });
//                     if (userData.type === "Vendor") {
//                         const restaurantData = response.data.restaurant;
//                         dispatch({
//                             type: actionTypes.SET_RESTAURANT,
//                             payload: restaurantData
//                         });
//                     }
//                     toast.success("Successfully updated data!")
//                 }
//             })
//     }
// }

// const getUser = payload => {
//     return dispatch => {
//         return axios.get(`http://localhost:3001/user/${payload.user_id}`)
//             .then(response => {
//                 if (response.status === 200) {
//                     const userData = response.data;
//                     dispatch({
//                         type: actionTypes.SET_USER,
//                         payload: userData
//                     })
//                 }
//             })
//     }
// }

export {
    registerUser,
    loginUser
};
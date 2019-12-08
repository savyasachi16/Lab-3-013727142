import {
    gql
} from 'apollo-boost';

const registerUserMutation = gql `
    mutation registerUser($first_name: String, $last_name: String, $email: String, $password: String, $account_type: String){
        registerUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password, account_type: $account_type){
            id
            first_name,
            last_name,
            email,
            password,
            account_type,
            phone,
            address
        }
    }
`;

const loginUserMutation = gql `
    mutation loginUser($email: String, $password: String){
        loginUser(email: $email, password: $password){
            id
            first_name
            last_name
            email
            password
            account_type
            phone
            address
        }
    }
`;

export {
    registerUserMutation,
    loginUserMutation
};
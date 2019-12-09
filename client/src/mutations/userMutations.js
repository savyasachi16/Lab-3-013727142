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

const updateUserMutation = gql `
  mutation updateUser(
    $user_id: ID
    $first_name: String
    $last_name: String
    $phone: String
    $address: String
    $restaurant_id: ID
    $restaurant_name: String
    $cuisine: String
    $restaurant_image: String
    $restaurant_address: String
    $restaurant_zipcode: Int
  ) {
    updateUser(
      user_id: $user_id
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      address: $address
      restaurant_id: $restaurant_id
      restaurant_name: $restaurant_name
      cuisine: $cuisine
      restaurant_image: $restaurant_image
      restaurant_address: $restaurant_address
      restaurant_zipcode: $restaurant_zipcode
    ) {
      first_name
      last_name
      phone
      address
      type
      restaurant_id
      restaurant_name
      cuisine
      restaurant_image
      restaurant_address
      restaurant_zipcode
    }
  }
`;

export {
    registerUserMutation,
    loginUserMutation,
    updateUserMutation
};
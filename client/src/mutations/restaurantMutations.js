import {
    gql
} from 'apollo-boost';

const getRestaurantQuery = gql `
  mutation getRestaurantQuery($user_id: ID) {
    getRestaurantQuery(user_id: $user_id) {
      restaurant_id
      restaurant_name
      cuisine
      restaurant_image
      restaurant_address
      zipcode
    }
  }
`;

const getRestaurantMenu = gql `
  mutation getRestaurantMenu($restaurant_id: ID) {
    getRestaurantMenu(restaurant_id: $restaurant_id) {
      section
      id
      dish {
        id
        name
        price
        description
        image
        section
      }
    }	    
  }
`;
export {
    getRestaurantQuery,
    getRestaurantMenu
};
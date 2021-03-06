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

const getCurrentRestaurant = gql `
mutation getCurrentRestaurant($restaurant_id: ID) {
  getCurrentRestaurant(restaurant_id: $restaurant_id) {
      id
      name
      cuisine
      address
      zipcode
      user_id
      menu {
        section
        id
        items {
          id
          name
          rate
          description
          image
          section
        }
      }
  }
}
`;
export {
    getRestaurantQuery,
    getRestaurantMenu,
    getCurrentRestaurant
};
import {
    gql
} from 'apollo-boost';

const getDishQuery = gql `
mutation getItem($dish_id: ID) {
    getDish(dish_id: $dish_id) {
        id
        name
        price
        description
        image
        section
    }
}
`;

const addDishQuery = gql `
mutation addDish(
    $name: String $rate: String $description: String $image: String $section: String $restaurant_id: ID
) {
    addDish(
        name: $name rate: $rate description: $description image: $image section: $section restaurant_id: $restaurant_id
    ) {
        id
        name
        price
        description
        image
        section
    }
}
`;

const searchDish = gql `
mutation searchItem($search_key: String) {
    searchDish(search_key: $search_key) {
        id
        name
        cuisine
        address
        zipcode
        user_id
    }
}
`;

export {
    getDishQuery,
    addDishQuery,
    searchDish
};
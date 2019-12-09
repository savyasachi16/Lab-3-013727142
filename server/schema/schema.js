const graphql = require("graphql");
const _ = require("lodash");
import {
    Users
} from '../src/sequelize';
import * as userService from '../handlers/user';
import * as restaurantService from '../handlers/restaurant';
import * as dishService from '../handlers/dish';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        first_name: {
            type: GraphQLString
        },
        last_name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        account_type: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        }
    })
});

const restaurantType = new GraphQLObjectType({
    name: "Restaurant",
    fields: () => ({
        restaurant_id: {
            type: GraphQLString
        },
        restaurant_name: {
            type: GraphQLString
        },
        cuisine: {
            type: GraphQLString
        },
        restaurant_image: {
            type: GraphQLString
        },
        restaurant_address: {
            type: GraphQLString
        },
        zipcode: {
            type: GraphQLInt
        }
    })
});
const dishType = new GraphQLObjectType({
    name: "Dish",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },
        description: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString
        },
        section: {
            type: GraphQLString
        }
    })
});

const restaurantMenuType = new GraphQLObjectType({
    name: "Menu",
    fields: () => ({
        section: {
            type: GraphQLString
        },
        id: {
            type: GraphQLString
        },
        dishes: {
            type: new GraphQLList(itemType)
        }
    })
});

const searchResult = new GraphQLObjectType({
    name: "SearchResult",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user_id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        cuisine: {
            type: GraphQLString
        },
        zipcode: {
            type: GraphQLString
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Users.findOne({
                    where: {
                        email: args.id
                    }
                }).then(user => {
                    return user;
                });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        registerUser: {
            type: UserType,
            args: {
                first_name: {
                    type: GraphQLString
                },
                last_name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                account_type: {
                    type: GraphQLString
                },
                phone: {
                    type: GraphQLString
                },
                address: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Users.findOne({
                    where: {
                        email: args.email
                    }
                }).then(user => {
                    if (!user) {
                        // User already exists
                    }
                    return Users.create({
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        password: args.password,
                        account_type: args.type,
                        phone: args.phone,
                        address: args.address
                    }).then(user => {
                        return Users.findOne({
                            where: {
                                email: user.email
                            }
                        }).then(user => {
                            return user;
                        });
                    });
                });
            }
        },
        loginUser: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
            },
            resolve(parent, args) {
                return Users.findOne({
                    where: {
                        email: args.email
                    }
                }).then(user => {
                    if (!user) {
                        // User already exists
                    }
                    const {
                        id,
                        first_name,
                        last_name,
                        email,
                        account_type,
                        phone,
                        address
                    } = user;
                    return {
                        id,
                        first_name,
                        last_name,
                        email,
                        account_type,
                        phone,
                        address,
                    }
                });
            }
        },
        updateUser: {
            type: UserType,
            args: {
                user_id: {
                    type: GraphQLID
                },
                first_name: {
                    type: GraphQLString
                },
                last_name: {
                    type: GraphQLString
                },
                phone: {
                    type: GraphQLString
                },
                address: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                },
                restaurant_id: {
                    type: GraphQLID
                },
                restaurant_name: {
                    type: GraphQLString
                },
                cuisine: {
                    type: GraphQLString
                },
                restaurant_image: {
                    type: GraphQLString
                },
                restaurant_address: {
                    type: GraphQLString
                },
                restaurant_zipcode: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return userService.updateUser(args).then(result => {
                    const {
                        user,
                        restaurant
                    } = result;
                    return {
                        user_id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone,
                        address: user.address,
                        type: user.type,
                        restaurant_id: restaurant ? restaurant.id : "",
                        restaurant_name: restaurant ? restaurant.name : "",
                        cuisine: restaurant ? restaurant.cuisine : "",
                        restaurant_image: restaurant ? restaurant.image : "",
                        restaurant_address: restaurant ? restaurant.address : "",
                        restaurant_zipcode: restaurant && restaurant.zipcode
                    };
                });
            }
        },
        getRestaurantQuery: {
            type: restaurantType,
            args: {
                user_id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                console.log("here", args.user_id);
                return restaurantService
                    .getRestaurant(args.user_id)
                    .then(restaurant => {
                        return {
                            restaurant_id: restaurant.id || "",
                            restaurant_name: restaurant.name || "",
                            cuisine: restaurant.cuisine || "",
                            restaurant_image: restaurant.image || "",
                            restaurant_address: restaurant.address || "",
                            zipcode: restaurant.zipcode
                        };
                    });
            }
        },
        getRestaurantMenu: {
            type: new GraphQLList(restaurantMenuType),
            args: {
                restaurant_id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return restaurantService
                    .getRestaurantMenu(args.restaurant_id)
                    .then(menu => {
                        console.log("here", menu);
                        return menu;
                    });
            }
        },
        getDish: {
            type: itemType,
            args: {
                Dish_id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return dishService.getDishDetails(args.dish_id).then(dish => {
                    return dish;
                });
            }
        },
        addDish: {
            type: itemType,
            args: {
                name: {
                    type: GraphQLString
                },
                rate: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                image: {
                    type: GraphQLString
                },
                section: {
                    type: GraphQLString
                },
                restaurant_id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return dishService.addDish(args).then(dish => {
                    return dish;
                });
            }
        },
        searchDish: {
            type: new GraphQLList(searchResult),
            args: {
                search_key: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return dishService.searchDishes(args.search_key).then(result => {
                    return result;
                })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
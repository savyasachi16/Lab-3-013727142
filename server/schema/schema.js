const graphql = require("graphql");
const _ = require("lodash");
import {
    Users
} from '../src/sequelize';

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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
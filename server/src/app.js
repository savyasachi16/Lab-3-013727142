import express from 'express';
import graphqlHTTP from 'express-graphql';
const schema = require('../schema/schema');
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import userRoutes from '../routes/user';
import restaurantRoutes from '../routes/restaurant';
import dishRoutes from '../routes/dish'
import orderRoutes from '../routes/order'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8080, () => {
    console.log("GraphQL server started on port 8080");
})

module.exports = app;
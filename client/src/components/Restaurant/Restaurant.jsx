import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { buyerActions } from "../../js/actions/index";
import {
  getCurrentRestaurant,
  getRestaurantMenu
} from "../../mutations/restaurantMutations";
import { Container, Row, Card, Form, Col } from "react-bootstrap";
import _ from "lodash";
import Navigbar from "../Navbar/Navbar";
import "./style.css";

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_restaurant: {
        id: "",
        name: "",
        cuisine: "",
        address: "",
        zipcode: "",
        image: "",
        menu: ""
      },
      cart: {}
    };
  }
  componentDidMount() {
    this.props
      .getCurrentRestaurant({
        variables: { restaurant_id: this.props.match.params.restaurant_id }
      })
      .then(restaurantResponse => {
        this.props
          .getRestaurantMenu({
            variables: {
              restaurant_id: this.props.match.params.restaurant_id
            }
          })
          .then(menuResponse => {
            const current_restaurant =
              restaurantResponse.data.getCurrentRestaurant;
            current_restaurant.menu = menuResponse.data.getRestaurantMenu;
            this.props.getRestaurantDetails(current_restaurant);
          });
      });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current_restaurant) {
      this.setState({
        current_restaurant: nextProps.current_restaurant
      });
    }
  }
  handleQuantity = e => {
    if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value > 10) {
      e.target.value = 10;
    }
    const cart = this.state.cart;
    cart[e.target.id] = e.target.value;
    this.setState({
      cart
    });
  };
  handleAddToCart = e => {
    e.preventDefault();
    const dishes = _.chain(this.state.current_restaurant.menu)
      .map("dishes")
      .concat()
      .flatten()
      .value();
    if (dishes && dishes.length) {
      const cart = dishes.map(dish => {
        if (
          this.state.cart[dish.id] &&
          parseInt(this.state.cart[dish.id]) !== 0
        ) {
          return {
            id: dish.id,
            name: dish.name,
            quantity: this.state.cart[dish.id],
            price: dish.price ? dish.price * this.state.cart[dish.id] : 0
          };
        } else if (parseInt(this.state.cart[dish.id]) === 0) {
          return {
            id: dish.id,
            name: dish.name
          };
        }
      });
      if (_.compact(cart) && _.compact(cart).length) {
        this.props.addToCart({
          cart: _.chain(cart)
            .compact()
            .filter("price")
            .value()
        });
      }
    }
  };
  render() {
    const { current_restaurant } = this.state;
    return (
      <div>
        <Navigbar />
        <div className="form-group row restaurant_title">
          <div className="image-container">
            <img
              src={current_restaurant.image}
              className="img-thumbnail"
              alt="Oops, restaurant has no image..."
            />
          </div>
          <div className="restaurant_name">
            <h1>{current_restaurant.name}</h1>
            <h5>{current_restaurant.address}</h5>
          </div>
        </div>
        <div className="restaurant-detail">
          <div className="container">
            <h3 className="menu">Menu</h3>
            {current_restaurant.menu && current_restaurant.menu.length
              ? current_restaurant.menu.map(eachSection => {
                  return (
                    <div className="section">
                      <h4>{eachSection.section}</h4>
                      <div>
                        <Container>
                          <Row>
                            {eachSection.dishes.map(dish => {
                              return (
                                <div className="m-2">
                                  <Card
                                    style={{ width: "14rem", height: "20rem" }}
                                    key={dish.id}
                                  >
                                    <Card.Img
                                      variant="top"
                                      src={dish.image}
                                      width="60px"
                                      height="90px"
                                    />
                                    <Card.Body>
                                      <Card.Title>{dish.name}</Card.Title>
                                      <Card.Text>
                                        <label>{dish.description}</label>
                                        <br></br>
                                        <label>${dish.price}</label>
                                        <Form.Group as={Row}>
                                          <Form.Label column sm="6">
                                            Quantity
                                          </Form.Label>
                                          <Col sm="6">
                                            <Form.Control
                                              type="number"
                                              placeholder=""
                                              min="0"
                                              max="10"
                                              id={dish.id}
                                              onChange={this.handleQuantity}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })}
                          </Row>
                        </Container>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <button
            type="submit"
            className="btn btn-danger m-3 float-right"
            onClick={this.handleAddToCart}
          >
            Add Selected Dishes to Cart
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  current_restaurant: state.buyer.current_restaurant
});
const mapDispatchToProps = dispatch => ({
  getRestaurantDetails: payload =>
    dispatch(buyerActions.getRestaurantDetails(payload)),
  addToCart: payload => dispatch(buyerActions.addToCart(payload))
});

export default compose(
  graphql(getCurrentRestaurant, { name: "getCurrentRestaurant" }),
  graphql(getRestaurantMenu, { name: "getRestaurantMenu" }),
  connect(mapStateToProps, mapDispatchToProps)
)(Restaurant);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql, compose } from "react-apollo";
import { userActions } from "../../js/actions";
import { registerUserMutation } from "../../mutations/userMutations";

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      account_type: "User"
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleCreate = e => {
    e.preventDefault();
    const payload = this.state;
    this.props
      .registerUserMutation({
        variables: {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
          account_type: payload.account_type,
          phone: payload.phone,
          address: payload.address
        }
      })
      .then(response => {
        this.props.registerUser(response.data.registerUser);
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body bg-light">
                  <h5 className="card-title text-center">
                    <b>Create your user account</b>
                  </h5>
                  <form onSubmit={e => this.handleCreate(e)}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="first_name"
                          maxLength="30"
                          required
                          autoFocus
                          pattern="[A-Za-z]{1,30}"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="last_name"
                          maxLength="30"
                          required
                          pattern="[A-Za-z]{1,30}"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          maxLength="80"
                          required
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          //minLength="8"
                          maxLength="80"
                          required
                          //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row"></div>
                    <button type="submit" className="btn btn-danger btn-block">
                      <b>Create your account</b>
                    </button>
                  </form>
                  <br></br>
                  <p className="text-center">
                    Have an account? <Link to="/login-user">Sign in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  registerUser: payload => dispatch(userActions.registerUser(payload, ownProps))
});

export default compose(
  graphql(registerUserMutation, { name: "registerUserMutation" }),
  connect(null, mapDispatchToProps)
)(CreateUser);

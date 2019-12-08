import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Main from "./components/Main";
import { Provider } from "react-redux";
import store from "./js/store/index";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <Provider store={store}>
        <ApolloProvider client={client}>
          <div>
            <Main />
          </div>
        </ApolloProvider>
      </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;

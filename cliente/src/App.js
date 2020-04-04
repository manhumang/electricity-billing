import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importar Componentes
import Header from './Components/Header';
import ElectricBillingElements from './Components/ElectricBillingElements';
import NewElectricBillingElement from './Components/NewElectricBillingElement';
import EditElectricBillingElement from './Components/EditElectricBillingElement';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={ElectricBillingElements} />
                <Route exact path="/electricbillingelement/new" component={NewElectricBillingElement} />
                <Route exact path="/electricbillingelement/edit/:id" component={EditElectricBillingElement} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
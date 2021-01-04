import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import UpdateProduct from './components/UpdateProduct';
//redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
      <Router>
        <Provider store={store}>
          <Header />
          <div className="container mt-5">
              <Switch>
                  <Route exact path="/" component={Products} />
                  <Route exact path="/product/new" component={NewProduct} />
                  <Route exact path="/product/update/:id" component={UpdateProduct} />
              </Switch>
          </div>
        </Provider>
      </Router>
  );
}

export default App;

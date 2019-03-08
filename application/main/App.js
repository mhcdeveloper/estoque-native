import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Route from '../routes';
import store from '../stores';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route />      
      </Provider>
    );
  }
}
import React, { PureComponent } from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import "@babel/polyfill";
import 'normalize.css';
import 'styles/main.scss';
import Home from 'containers/Home';
import configureStore from 'state/store';

const { store, persistor } = configureStore();

class App extends PureComponent {
  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={ persistor }>
          <Home />
        </PersistGate>
      </Provider>
      )
  }
}

export default App;

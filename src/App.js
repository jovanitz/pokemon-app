import React, { PureComponent } from "react";
import "@babel/polyfill";
import 'normalize.css';
import 'styles/main.scss';
import Home from 'containers/Home';


class App extends PureComponent {
  render() {
    return (
      <div>
        <Home />
      </div>
      )
  }
}

export default App;

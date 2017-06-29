import React, {Component} from 'react';
import './App.css';

import Links from './examples/LinksDifferentFromATag';

class App extends Component {
    render() {
        return (
              <div className="App">
                <Links />
              </div>
        );
    }
}

export default App;

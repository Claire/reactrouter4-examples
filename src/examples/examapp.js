import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Link } from 'react-router-dom';

import About from './components/About';
import Home from './components/Home';
import Topics from './components/Topics';

const history = createHistory({});

const App = () => (
    <div>
        <h2>App {this.props.match.appId}</h2>
    </div>
);

const Table = () => (
    <div>
        <h2>App from table route {this.props.match.appId}</h2>
        <h3>Table {this.props.match.tableId}</h3>
    </div>
);

const Report = () => (
    <div>
        <h2>App from report route {this.props.match.appId}</h2>
        <h3>Table from report route{this.props.match.tableId}</h3>
        <h3>report {this.props.match.reportId}</h3>
    </div>
);

const BasicExample = () => (
    <Router history={history} >
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/app/3">app/3</Link></li>
                <li><Link to="/app/dfsdfdsf/table/eewrerio">app/dfsdfdsf/table/eewrerio</Link></li>
                <li><Link to="/app/abc/table/xyz/report/4">app/abc/table/xyz/report/4</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/app:appId" component={App} />
            <Route path="/app/:appId/table/:tableId" component={Table} />
            <Route path="/app/:appId/table/:tableId/report/:reportId" component={Report} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
);

render(<BasicExample />, document.body);

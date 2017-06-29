import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';



const BasicExample = () => (
    <Router>
        <div>
            <h3> Links </h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
            <h3> A tags </h3>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/topics">Topics</a></li>
            </ul>
            </div>
    </Router>
);


export default BasicExample;

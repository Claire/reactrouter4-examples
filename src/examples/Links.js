import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';


const LinksExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
            <hr/>
        </div>
    </Router>
);


export default LinksExample;

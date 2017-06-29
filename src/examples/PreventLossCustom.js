import React from 'react';
import history from './history';
import {
    Router,
    Route,
    Link,
    Prompt
} from 'react-router-dom';

import * as ReactDOM from "react-dom";

const UserConfirmation = ({message, onConfirm, onCancel}) =>{
    return (<div>
        <h1>Ok to leave?{message} </h1>
        <button onClick={onConfirm}> ok </button>
        <button onClick={onCancel}> no </button>
    </div>);
};

const getUserConfirmation = (message, callback) => {

    const modal = document.createElement('div');
    document.body.appendChild(modal);

    const withCleanup = (answer) => {
        ReactDOM.unmountComponentAtNode(modal);
        document.body.removeChild(modal);
        callback(answer);
    };

    ReactDOM.render(
    <UserConfirmation
        message={message}
        onCancel={() => withCleanup(false)}
        onConfirm={() => withCleanup(true)}
    />,
    modal
);
};
let unblock = null;

class Form extends React.Component {
    state = {
        isBlocking: false,
        msg : 'Are you sure you want to leave this page?'
    }

    blockIt(e) {
        if (this.state.isBlocking) {
            let dialogText = this.state.msg;
            e.returnValue = dialogText;
        }
    }
    noop() {

    }
    componentDidMount() {
        window.addEventListener("beforeunload", (e)=>{this.blockIt(e);});
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", ()=>{this.noop();});
    }
    render() {
        const {isBlocking} = this.state;
        if (isBlocking && !unblock) {
            unblock = history.block(this.state.msg);
        } else if (unblock) {
            unblock();
        }
        return (
            <form
                onSubmit={event => {
                    event.preventDefault();
                    event.target.reset();
                    this.setState({
                        isBlocking: false
                    });
                }}
            >
                <Prompt
                    when={isBlocking}
                    message={location => (
                        `Are you sure you want to go to ${location.pathname}`
                    )}
                />

                <p>
                    Blocking? {isBlocking ? 'Yes, click a link or the back button' : 'Nope'}
                </p>

                <p>
                    <input
                        size="50"
                        placeholder="type something to block transitions"
                        onChange={event => {
                            this.setState({
                                isBlocking: event.target.value.length > 0
                            });
                        }}
                    />
                </p>

                <p>
                    <button>Submit to stop blocking</button>
                </p>
            </form>
        );
    }
}

const PreventingTransitionsCustomExample = () => (
    <Router history={history} getUserConfirmation={getUserConfirmation}>
        <div>
            <ul>
                <li><Link to="/">Form</Link></li>
                <li><Link to="/one">One</Link></li>
                <li><Link to="/two">Two</Link></li>
            </ul>
            <Route path="/" exact component={Form}/>
            <Route path="/one" render={() => <h3>One</h3>}/>
            <Route path="/two" render={() => <h3>Two</h3>}/>
        </div>
    </Router>
);


history.listen((location, action) => {
    console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    console.log(`The last navigation action was ${action}`);
});

export default PreventingTransitionsCustomExample;

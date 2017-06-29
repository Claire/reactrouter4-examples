import React, {Component}  from 'react';
import {
    BrowserRouter,
    Route,
    withRouter,
    Link
} from 'react-router-dom';

const PEEPS = [
    {id: 0, name: 'Michelle', friends: [1, 2, 3]},
    {id: 1, name: 'Sean', friends: [0, 3]},
    {id: 2, name: 'Kim', friends: [0, 1, 3]},
    {id: 3, name: 'David', friends: [1, 2]}
];

// eslint-disable-next-line eqeqeq
const find = (id) => PEEPS.find(p => p.id == id);

function handleLink(theHistory, target, stateProps) {
    theHistory.push(`${target}`);
}


class Person extends Component {
    render() {
        let info = this.props; // has match, props, location
        console.log(JSON.stringify(info, null, 2));
        const person = find(info.match.params.id);
        return (
            <div>
                <h3>{person.name}’s Friends</h3>
                <ul>
                    {person.friends.map(id => (
                        <li key={id}
                            onClick={() => handleLink(info.history, `${info.match.url}/${id}`, {extra: 'useful info'})}
                        >
                            {find(id).name}
                        </li>
                    ))}
                </ul>
                <Route path={`${info.match.url}/:id`} component={Person}/>
            </div>
        );
    }
}

const RecursiveExample = () => (
    <BrowserRouter>
        <Route render={({history}) => (
            <Person match={{params: {id: 0}, url: ''}}
                    history={history}/>
        )}/>
    </BrowserRouter>
);

export default RecursiveExample;

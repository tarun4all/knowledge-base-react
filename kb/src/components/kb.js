import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Input, Space, Button } from 'antd';
import { AppStateContext } from "../store/AppStateProvider";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useLocation,
} from "react-router-dom";

function KB() {
    const { SetMessage, SetError, SetLoader } = React.useContext(AppStateContext);
    const [showModal, setShowModal] = React.useState(false);
    const [counter, setCounter] = React.useState(0);
    let match = useRouteMatch();
    let history = useHistory();
    let loc = useLocation();
    let {topicId} = useParams();
  
    console.log(match, history, loc);
    function SendButtonMessage() {
    //   SetLoader(true);
        history.push(`${match.url}/components`, {loda: 'lassan'})
    }
  
    return (
        <div>
            <h2>Topics</h2>
            <button onClick={() => setCounter(counter + 1)}>Increment</button><br />
            {counter}<br />
            <button onClick={SendButtonMessage}>Route</button>
            <ul>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
            </ul>
    
            {/* The Topics page has its own <Switch> with more routes
                that build on the /topics URL path. You can think of the
                2nd <Route> here as an "index" page for all topics, or
                the page that is shown when no topic is selected */}
            <Switch>
            <Route path={`${match.path}/:topicId`}>
                <Topic />
            </Route>
            <Route path={match.path}>
                <h3>Please select a topic.</h3>
            </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default KB;

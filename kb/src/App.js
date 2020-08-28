import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppStateProvider from "./store/AppStateProvider";
import TestGlobal from'./components/common/TestGlobal';
import KB from './components/kb';
import KnowledgeBase from './components/KnowledgeBase';
import Training from './components/Training';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import Navbar from "./components/common/navBar";

const { Header } = Layout;

function App() {
  let history = useHistory();

  function routeNavBar({key}) {
    console.log(key);
    history.push(key);
  }

  return (
    <Router>
      <AppStateProvider>
          <Navbar />
          <div className="paddingDiv">
            {/* <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/kb/show/123">Show KB</Link>
                </li>
                <li>
                  <Link to="/kb/create">Create</Link>
                </li>
                <li>
                  <Link to="/training/ruleBased">Train Data</Link>
                </li>
              </ul>
            </nav> */}
            <Switch>
              <Route path="/" exact>
                <TestGlobal />
              </Route>
              <Route path="/users">
                <KB />
              </Route>
              <Route path="/kb/show/:id">
                <KnowledgeBase />
              </Route>
              <Route path="/kb/create">
                <KnowledgeBase />
              </Route>
              <Route path="/training/:tab">
                <Training />
              </Route>
              <Route path="/training">
                <Training />
              </Route>
            </Switch>
          </div>
      </AppStateProvider>
    </Router>
  );
}

export default App;

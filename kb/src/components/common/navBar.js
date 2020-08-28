import React from 'react';
import '../../App.css';
import 'antd/dist/antd.css';
import {
  useHistory
} from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function Navbar() {
  let history = useHistory();

  function routeNavBar({key}) {
    console.log(key);
    history.push(key);
  }

  return (
    <>
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item onClick={routeNavBar} key="/">Home</Menu.Item>
                <Menu.Item onClick={routeNavBar} key="/training/ruleBased">Train Data</Menu.Item>
                <Menu.Item onClick={routeNavBar} key="/kb/show/123">KB</Menu.Item>
            </Menu>
        </Header>
    </>
  );
}

export default Navbar;

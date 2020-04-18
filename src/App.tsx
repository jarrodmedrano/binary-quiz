import { Layout, Menu } from 'antd';
import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import ToDecimal from './components/ToDecimal/ToDecimal';
const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="layout" style={{ height: '100vh' }}>
        <Sider
        >
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">
              <Link to="/">Convert to Decimal</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Switch>
          <Route path="/">
            <Content style={{ padding: '0 50px' }}>
              <ToDecimal />
            </Content>
          </Route>
        </Switch>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}
export default App;

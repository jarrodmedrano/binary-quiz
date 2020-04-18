import { Layout, Menu } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Layout className="layout" style={{ height: '100vh' }}>
      <Sider
      >
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </Menu>
      </Sider>
      <Header style={{ background: 'transparent' }} />
      <Content style={{ padding: '0 50px' }}>
        <App />
      </Content>
      <Footer />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

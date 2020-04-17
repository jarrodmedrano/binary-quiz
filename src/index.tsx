import { Layout } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <React.StrictMode>
    <Layout className="layout">
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

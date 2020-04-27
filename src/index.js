import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './main';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import BannerReducer from './redux/reducer'
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3000/graphql'
})
const client = new ApolloClient({
  cache,
  link,
  dataIdFromObject: o => o.id
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const store = createStore(BannerReducer);



ReactDOM.render(

  <ApolloProvider client={client}><Provider store={store}><Main /></Provider></ApolloProvider>,
  document.getElementById('root')
);

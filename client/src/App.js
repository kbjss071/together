import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {Provider} from 'react-redux'
import Nav from './components/Navbar/Nav'
import Home from './pages/Home'
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers})=> {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider>
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<Home /> }
              />
            </Routes>

          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

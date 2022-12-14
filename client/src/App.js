import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import Nav from './components/Navbar/Nav'
import Home from './pages/Home'
import Login from './components/Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
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
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<Home /> }
              />
              <Route
                path="/login"
                element={<Login />}
              />
            </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

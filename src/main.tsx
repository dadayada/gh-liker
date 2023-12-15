import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './app';
import { Search } from './search';
import { FavoritesList } from './favorites-list';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization:
      `bearer ${import.meta.env.VITE_GH_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: 'Unexpected error',
    children: [
      { path: '/', element: <Navigate to='/search' replace/> },
      { path: 'search', element: <Search /> },
      { path: 'favorites', element: <FavoritesList /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

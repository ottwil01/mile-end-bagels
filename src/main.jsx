import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import Menu from './components/Menu';
import Login from './components/Login';
import MenuEdit from './components/MenuEdit';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit" element={<MenuEdit />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

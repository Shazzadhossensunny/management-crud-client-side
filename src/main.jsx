import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllUsers from './components/AllUsers.jsx';
import UpdateUser from './components/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/allUsers",
    element:<AllUsers></AllUsers>,
    loader: () => fetch('http://localhost:5000/users')
  },
  {
    path: "/updateUser/:id",
    element: <UpdateUser></UpdateUser>,
    loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)

import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../error/ErrorPage';
import Login from '../Component/Login/Login';
import Register from '../Component/Register/Register';
import Home from '../Pages/Home';
import AddCard from '../Component/AddCard/AddCard';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Main from '../Main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage></ErrorPage>,
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home></Home>,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <Login></Login>,
  },
  {
    path: 'register',
    element: <Register></Register>,
  },
  {
    path: 'product',
    element: <AddCard></AddCard>,
  },
]);
export default router;

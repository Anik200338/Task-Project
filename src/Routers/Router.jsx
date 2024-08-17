import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../error/ErrorPage';
import Login from '../Component/Login/Login';
import Register from '../Component/Register/Register';
import Home from '../Pages/Home';
import AddCard from '../Component/AddCard/AddCard';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage></ErrorPage>,
    element: <Home></Home>,
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

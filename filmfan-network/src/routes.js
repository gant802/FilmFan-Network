import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Search from './Pages/Search';
import MovieDetails from './Pages/MovieDetails';
import TVDetails from './Pages/TVDetails';
import LoginPage from './Pages/LoginPage';
import CreateAccount from './Pages/CreateAccount';
import App from './App'
import UserProfile from './Pages/UserProfile';




const routes = [
    {
      path: "/",
      element: <App />, 
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/search",
          element: <Search />
        },
        { 
          path: "/movie/:id",
          element: <MovieDetails />
        },
        {
          path: "/tv/:id",
          element: <TVDetails />
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/createAccount",
          element: <CreateAccount />
        },
        {
          path: "/userProfile/:id",
          element: <UserProfile />
        }
      ]
    }
  ]

  export default routes
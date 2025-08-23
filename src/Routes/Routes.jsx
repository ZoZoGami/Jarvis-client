import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Routine from "../components/Routine/Routine";
import StickyNotes from "../components/StickyNotes/StickyNotes";
import Todo from "../pages/Todo/Todo";
import Links from "../pages/Links/Links";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Academics from "../pages/Academics/Academics";
import LottieError from "../pages/ErrorPage/lottieError";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,   // Root is always available
    errorElement: <LottieError />,
    children: [
      { path: "/", element: <PrivateRoute><Todo /></PrivateRoute> },
      { path: "/routine", element: <PrivateRoute><Routine /></PrivateRoute> },
      { path: "/link", element: <PrivateRoute><Links /></PrivateRoute> },
      { path: "/academics", element: <PrivateRoute><Academics /></PrivateRoute> },
      { path: "/login", element: <Login /> },    // public
      { path: "/signup", element: <SignUp /> },  // public
      { path: "/courses", element: <ErrorPage /> },
    ],
  },
]);


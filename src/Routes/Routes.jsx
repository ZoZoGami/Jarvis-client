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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement:<ErrorPage></ErrorPage>,
    errorElement: <LottieError></LottieError>,
    children: [
      { path: "/", element: <Todo></Todo> },
      { path: "/routine", element: <Routine></Routine> },
      { path: "/link", element: <Links></Links> },
      { path: "/academics", element: <Academics></Academics> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "/courses", element: <ErrorPage></ErrorPage> },
    ],
  },
]);

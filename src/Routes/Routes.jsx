import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Routine from "../components/Routine/Routine";
import StickyNotes from "../components/StickyNotes/StickyNotes";
import Todo from "../pages/Todo/Todo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <Todo></Todo> },
      { path: "/routine", element: <Routine></Routine> },
      { path: "/stickynotes", element: <StickyNotes> </StickyNotes> },
      { path: "login", element: <Login/> },
      { path: "signup", element: <SignUp /> }
    ],
  },
]);
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          className="rounded-lg bg-orange-400 font-semibold  hover:bg-orange-500 hover:text-white"
        >
          TODO
        </Link>
      </li>
      <li>
        <Link
          to="/routine"
          className="rounded-lg bg-orange-400 font-semibold  hover:bg-orange-500 hover:text-white"
        >
          Routine
        </Link>
      </li>
      <li>
        <Link
          to="/academics"
          className="rounded-lg bg-orange-400 font-semibold  hover:bg-orange-500 hover:text-white"
        >
          Academic
        </Link>
      </li>
      <li>
        <Link
          to="/link"
          className="rounded-lg bg-orange-400 font-semibold  hover:bg-orange-500 hover:text-white"
        >
          Link
        </Link>
      </li>
      <li>
        <Link
          to="/courses"
          className="rounded-lg bg-orange-400 font-semibold  hover:bg-orange-500 hover:text-white"
        >
          Others
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar  z-100 max-w-screen p-5 text-black shadow-md backdrop-blur-md bg-[#f6e7de]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-3 shadow bg-black/80 rounded-lg w-48"
          >
            {navLinks}
          </ul>
        </div>

        <h1 className="text-5xl ml-4 text-orange-500 font-bold">JARVIS</h1>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4 space-x-12 text-lg">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end flex gap-3">
        {user ? (
          <button
            onClick={handleLogOut}
            className="px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 transition"
          >
            LogOut
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-lg border border-black/40 hover:bg-orange-400 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;

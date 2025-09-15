import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import UserInfo from "../Pages/UserInfo";

export const routes = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Home /> },
  { path: "/user/info", element: <UserInfo /> },
  { path: "/user/login", element: <Login /> },
  { path: "/user/register", element: <Register /> },
];

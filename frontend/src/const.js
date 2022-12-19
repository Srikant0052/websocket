import Home from "./pages/cardGame";
import Login from "./pages/login";
import CardGame from "./pages/cardGame";
import Registeration from "./pages/registeration";
import Timer from "./pages/timer";

export const ROUTES = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/register",
    page: <Registeration />,
  },
  {
    path: "/login",
    page: <Login />,
  },
  {
    path: "/card",
    page: <CardGame />,
  },
  {
    path: "/timer",
    page: <Timer />,
  },
];

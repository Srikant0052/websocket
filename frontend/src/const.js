import Capcoin from "./pages/capCoin";
import Home from "./pages/bitstamp";

export const ROUTES = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/coins",
    page: <Capcoin />,
  },
];

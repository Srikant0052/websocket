import Capcoin from "./pages/capCoin";
import Home from "./pages/bitstamp";
import CoinPair from "./pages/coinPair";

export const ROUTES = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/coins",
    page: <Capcoin />,
  },
  {
    path: "/pairs",
    page: <CoinPair />,
  },
];

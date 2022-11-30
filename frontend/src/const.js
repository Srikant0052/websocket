import Capcoin from "./pages/capCoin";
import Home from "./pages/bitstamp";
import CoinPair from "./pages/coinPair";
import Binance from "./pages/binance";
import Bitget from "./pages/bitget";
import Bitso from "./pages/bitso";

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
  {
    path: "/binancePair",
    page: <Binance />,
  },
  {
    path: "/bitgetPair",
    page: <Bitget />,
  },
  {
    path: "/bitsoPair",
    page: <Bitso />,
  },
];

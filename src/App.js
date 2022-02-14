import "./App.css";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import axios from "axios";

const ws_base_url = "wss://production-esocket.delta.exchange";

function App() {
  const [apiData, setApiData] = useState([]);
  const [symbolsArr, setSymbolsArr] = useState([]);
  const [markPrice, setMarkPrice] = useState("");

  const fetchMarkPrice = () => {
    const socket = new WebSocket(ws_base_url);

    socket.onopen = () => {
      const params = {
        type: "subscribe",
        payload: {
          channels: [
            {
              name: "v2/ticker",
              symbols: symbolsArr,
            },
          ],
        },
      };
      socket.send(JSON.stringify(params));

      socket.onmessage = (msg) => {
        const { mark_price } = JSON.parse(msg.data);
        setMarkPrice(mark_price);
      };
    };
  };

  useEffect(() => {
    axios
      .get("https://api.delta.exchange/v2/products")
      .then((res) => {
        setApiData(res?.data?.result);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const arr = [];
    apiData.forEach(({ symbol }) => arr.push(symbol));
    setSymbolsArr(arr);
  }, [apiData]);

  useEffect(() => fetchMarkPrice(), [symbolsArr]);

  return (
    <div>
      {apiData.length > 0 && markPrice ? (
        <DataTable
          apiData={apiData}
          symbolsArr={symbolsArr}
          markPrice={markPrice}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;

import React from "react";
import { TableControl } from "react-bootstrap-table-control";

//router
import { useNavigate } from "react-router-dom";

//styles
import styles from "./Home.module.css";

//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//actions
import { pairsActions } from "../store/pairs-slice";
import ws from "../utils/websocket";

const Home = () => {
  const allPairs = useSelector((state) => state.pairs.pairs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages5, setMessages5] = useState([]);

  useEffect(() => {
    if (messages5?.length === 5) {
      // console.log("prvih 5", messages5);
      dispatch(pairsActions.pairInitialize(messages5));
    }
  }, [messages5]);

  useEffect(() => {
    // ws();

    ws.onopen = () => {
      console.log("Konekcija je uspostavljena");

      // Event handler za primanje poruka
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.symbol) {
          setMessages5((prevState) => {
            return [...prevState, data];
          });
        }

        if (data[1]?.length === 10) {
          dispatch(pairsActions.pairUpdate(data));
        }

        // console.log("Primljena poruka:", data);
      };

      fetch("/nesto/v1/symbols", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const currencyPairs = data
            .slice(0, 5)
            .map((par) => par.toUpperCase());

          subscribeToWebSocketUpdates(currencyPairs);
        })
        .catch((error) => {
          console.error("Greška pri dohvatanju valutnih parova:", error);
        });

      function subscribeToWebSocketUpdates(pairs) {
        pairs.forEach((pair) => {
          const subscribeMessage = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: pair,
          });
          ws.send(subscribeMessage);
        });
      }
    };
  }, [allPairs]);

  return (
    <div className={styles["table-wrapper"]}>
      <TableControl
        clickable={true}
        onClickItem={(e) => {
          navigate(`/details/${e.pair}`);
        }}
        header={[
          { key: "pair", name: "Name" },
          { key: "last_price", name: "Last" },
          { key: "daily_change", name: "Change" },
          { key: "daily_change_percent", name: "Change Percent" },
          { key: "daily_high", name: "High" },
          { key: "daily_low", name: "Low" },
        ]}
        itens={allPairs}
      />
    </div>
  );
};

export default Home;

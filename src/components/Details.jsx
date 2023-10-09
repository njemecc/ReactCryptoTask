//stilovi
import styles from "./Details.module.css";
//rutiranje
import { useParams } from "react-router-dom";
//bootstrap
import { TableControl } from "react-bootstrap-table-control";
//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
const Details = () => {
  const { id } = useParams();
  const [parZaPrikaz, setParZaPrikaz] = useState([]);
  const dispatch = useDispatch();
  const allFavorites = useSelector((state) => state.auth.favorites);
  const [vecJeUOmiljenim, setVecJeUOmiljenim] = useState(false);
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  const unnestedArr = [].concat(...allFavorites);

  const addToFavoritesHandler = () => {
    dispatch(authActions.addToFavorites(parZaPrikaz));

    setVecJeUOmiljenim(true);
  };

  const removeFromFavoritesHandler = () => {
    dispatch(authActions.removeFromFavorites(id));

    setVecJeUOmiljenim(false);
  };

  useEffect(() => {
    unnestedArr.map((omiljeni) => {
      if (omiljeni.pair == id) {
        setVecJeUOmiljenim(true);
      }
    });

    const options = { method: "GET", headers: { accept: "application/json" } };
    const response = fetch(`/nesto/v1/pubticker/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        setParZaPrikaz([{ ...response, pair: id }]);
      });
  }, [allFavorites]);

  return (
    <div className={styles["wrapper-div"]}>
      <TableControl
        header={[
          { key: "pair", name: "Symbol" },
          { key: "last_price", name: "Last" },
          { key: "high", name: "High" },
          { key: "low", name: "Low" },
        ]}
        itens={parZaPrikaz}
      />

      {userLoggedIn ? (
        vecJeUOmiljenim ? (
          <button
            className={styles["btn-remove"]}
            onClick={removeFromFavoritesHandler}
          >
            Remove from favorites
          </button>
        ) : (
          <button className={styles["btn-add"]} onClick={addToFavoritesHandler}>
            Add to favorites
          </button>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Details;

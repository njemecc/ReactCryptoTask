//hooks
import { useSelector } from "react-redux";

//styles
import styles from "./Favorite.module.css";

//bootstrap
import { TableControl } from "react-bootstrap-table-control";

//react-router
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const favoritePairs = useSelector((state) => state.auth.favorites);
  const navigate = useNavigate();
  let allPairs = useSelector((state) => state.pairs.pairs);

  const onlyFavPairs = [];
  const noviNeki = [];

  favoritePairs.map((par) => {
    onlyFavPairs.push(par.pair);
  });

  for (let i = 0; i < onlyFavPairs.length; i++) {
    allPairs.map((par) => {
      if (par.pair == onlyFavPairs[i]) {
        noviNeki.push(par);
      }
    });
  }

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
        itens={noviNeki}
      />
    </div>
  );
};

export default Favorite;

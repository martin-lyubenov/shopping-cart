import { useContext } from "react";
import classes from "./CartVisibilityButton.module.css";
import CartContext from "../../context/cart-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faX } from "@fortawesome/free-solid-svg-icons";

function CartVisibilityButton({ toggleVisibilityHandler, isVisible }) {
  const { totalQuantity } = useContext(CartContext);

  const btnSvg = !isVisible ? (
    <div className={classes.icon}>
      <FontAwesomeIcon
        className={classes["shopping-cart"]}
        icon={faCartShopping}
      />{" "}
      <div className={classes["item-count"]}>{totalQuantity}</div>
    </div>
  ) : (
    <FontAwesomeIcon className={classes["shopping-cart"]} icon={faX} />
  );

  return (
    <button onClick={toggleVisibilityHandler} className={classes.btn}>
      {btnSvg}
    </button>
  );
}

export default CartVisibilityButton;

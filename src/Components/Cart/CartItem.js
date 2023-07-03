import { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../context/cart-context";

function CartItem({ objectId, title, quantity, price, bgImg }) {
  const { increaseQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext);

  function increaseItem() {
    increaseQuantity({ objectId, price, title, bgImg });
  }

  function decreaseItem() {
    decreaseQuantity({ objectId, price, title, bgImg });
  }

  function removeItemHandler() {
    removeItem({ objectId, price, title, bgImg });
  }

  return (
    <div className={classes["cart-item"]}>
      <div className={classes.flex}>
        {" "}
        <img className={classes.img} src={bgImg} />
        <div>
          <p>{title}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>

      <div>
        <div className={classes["remove-btn-container"]}>
          <button
            onClick={removeItemHandler}
            className={classes["remove-item-btn"]}
          >
            X
          </button>
        </div>
        <p className={classes.price}>$ {price}</p>
        <div className={classes.actions}>
          <button
            onClick={decreaseItem}
            disabled={quantity <= 1}
            className={classes.btn}
          >
            -
          </button>
          <button onClick={increaseItem} className={classes.btn}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

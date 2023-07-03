import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useContext } from "react";
import CartContext from "../../context/cart-context";

function Cart() {
  const { cartItemList, totalQuantity, totalPrice } = useContext(CartContext);
  const formattedPrice = Math.abs(totalPrice).toFixed(2);

  function DUMMY_CHECKOUT_FUNC() {
    alert("Products sent to checkout");
  }

  return (
    <section className={classes.cart}>
      <header className={classes.header}>
        <div className={classes.icon}>
          <FontAwesomeIcon
            className={classes["shopping-cart"]}
            icon={faCartShopping}
          />{" "}
          <div className={classes["item-count"]}>{totalQuantity}</div>
        </div>
        <p>Cart</p>
      </header>
      <article className={classes["item-list"]}>
        {cartItemList.map((product) => (
          <CartItem
            key={product.objectId}
            objectId={product.objectId}
            title={product.title}
            quantity={product.quantity}
            price={product.price}
            bgImg={product.bgImg}
          />
        ))}
      </article>

      <footer className={classes.footer}>
        <div className={classes.subtotal}>
          <p className={classes["subtotal-text"]}>Subtotal</p>{" "}
          <p className={classes.total}>
            $ <span>{formattedPrice}</span>
          </p>
        </div>

        <button onClick={DUMMY_CHECKOUT_FUNC} className={classes.btn}>
          Checkout
        </button>
      </footer>
    </section>
  );
}

export default Cart;

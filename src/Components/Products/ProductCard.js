import { useContext } from "react";
import classes from "./ProductCard.module.css";
import CartContext from "../../context/cart-context";

function ProductCard({ objectId, price, title, bgImg, freeShipping }) {
  const formattedPrice = price.toFixed(2);
  const [mainPrice, afterDecimal] = formattedPrice.split(".");


  const { increaseQuantity } = useContext(CartContext);

  function addItemHandler() {
    increaseQuantity({ objectId, price, title, bgImg, freeShipping });
  }

  return (
    <article className={classes.card}>
      {freeShipping && (
        <div className={classes["free-shipping"]}>Free shipping</div>
      )}
      <img src={bgImg} className={classes.img} />
      <p className={classes.title}>{title}</p>
      <p className={classes.price}>
        $<span className={classes["main-price"]}>{mainPrice}</span>.
        {afterDecimal}
      </p>
      <button onClick={addItemHandler} className={classes.button}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;

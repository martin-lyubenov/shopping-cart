import ProductCard from "./ProductCard";
import classes from "./Products.module.css";

function Products({ productList, sizeFilterList }) {
  let filteredProducts = [];

  if (sizeFilterList.length > 0) {
    for (const size of sizeFilterList) {
      for (const product of productList) {
        if (product.size === size) {
          filteredProducts.push(product);
        }
      }
    }
  } else {
    filteredProducts = productList.slice();
  }

  const productCount = filteredProducts.length;

  return (
    <section>
      <h3 className={classes.heading}>
        {productCount} Product{productCount > 1 ? "s" : ""} found
      </h3>
      <div className={classes.container}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.objectId}
            objectId={product.objectId}
            price={product.price}
            title={product.title}
            freeShipping={product.freeShipping}
            bgImg={product.bgImg}
          />
        ))}
      </div>
    </section>
  );
}

export default Products;

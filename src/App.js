import { useEffect, useState } from "react";
import Cart from "./Components/Cart/Cart";
import MainContainer from "./Components/MainContainer";
import Products from "./Components/Products/Products";
import SizesFilter from "./Components/SizesFilter/SizesFilter";
import CartVisibilityButton from "./Components/Cart/CartVisibilityButton";
import useHTTP from "./hooks/http";
import { CartContextProvider } from "./context/cart-context";

let isInitialized = false;

function App() {
  const { request } = useHTTP();
  const [isVisible, setIsVisible] = useState(false);
  const [productList, setProductList] = useState([]);
  const [sizeFilterList, setSizeFilterList] = useState([]);

  // load product list at startup
  useEffect(() => {
    async function getProducts() {
      try {
        const data = await request("GET", "");
        const products = data.results;

        const loadedProducts = [];

        for (const key in products) {
          loadedProducts.push(products[key]);
        }
        setProductList(loadedProducts);
      } catch (error) {
        alert(error.error);
      }
    }

    if (isInitialized === false) {
      isInitialized = true;
      getProducts();
    }
  }, [request]);

  function toggleVisibilityHandler() {
    setIsVisible((prevVis) => !prevVis);
  }

  function sizeFilterHandler(sizeFilterCriteria) {
    if (
      sizeFilterCriteria.checked &&
      !sizeFilterList.includes(sizeFilterCriteria.value)
    ) {
      setSizeFilterList((prevSizeFilterList) => [
        ...prevSizeFilterList,
        sizeFilterCriteria.value,
      ]);
    } else {
      const updatedSizeFilterCriteria = sizeFilterList.filter(
        (item) => item !== sizeFilterCriteria.value
      );
      setSizeFilterList(updatedSizeFilterCriteria);
    }
  }

  return (
    <CartContextProvider>
      <MainContainer>
        <CartVisibilityButton
          toggleVisibilityHandler={toggleVisibilityHandler}
          isVisible={isVisible}
        />
        {isVisible && <Cart />}
        <SizesFilter onSizeFilterCheck={sizeFilterHandler} />
        <Products productList={productList} sizeFilterList={sizeFilterList} />
      </MainContainer>
    </CartContextProvider>
  );
}

export default App;

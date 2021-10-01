import React from "react";
import useProducts from "../../Hooks/useProducts";
import useCart from "../../Hooks/useCart";
import Cart from "../Cart/Cart";
import Review from "../Review/Review";
import { clearTheCart, removeFromDb } from "../../utilities/fakedb";
import { useHistory } from "react-router";

const OrderReview = () => {
  const [products] = useProducts();
  const [cart, setCart] = useCart(products);

  const history = useHistory();

  const handleRemove = (key) => {
    const newCart = cart.filter((product) => product.key !== key);
    setCart(newCart);
    removeFromDb(key);
  };

  const handlePlaceOrder = () => {
    history.push("/placeOrder");
    setCart([]);
    clearTheCart();
  };
  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {cart.map((product) => (
            <Review
              key={product.key}
              product={product}
              handleRemove={handleRemove}
            ></Review>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}>
            <button onClick={handlePlaceOrder} className="btn-regular">
              Place Order
            </button>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default OrderReview;

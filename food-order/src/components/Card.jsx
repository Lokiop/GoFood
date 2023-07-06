import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItems;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const cartData = useCart();

  const handleAddToCart = async () => {
    let isInCart = false;
    for (const item of cartData) {
      if (
        item.id === foodItem._id &&
        item.size === size &&
        item.user === localStorage.getItem("email")
      ) {
        isInCart = true;
        break;
      }
    }

    if (isInCart) {
      await dispatch({
        type: "Update",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size,
      });
      return;
    }

    await dispatch({
      type: "Add",
      id: foodItem._id,
      name: foodItem.name,
      img: foodItem.img,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  const finalPrice = parseInt(qty) * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "160px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name} </h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 rounded bg-success"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 rounded bg-success"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline fs-5"> ₹{finalPrice} /-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
          user: localStorage.getItem("email"),
        },
      ];

    case "Remove":
      let newArr = [...state];
      const updatedArr = newArr.filter(
        (food) => food.id !== action.id || food.user !== action.user
      );
      return updatedArr;

    case "Update":
      return state.map((food) => {
        if (
          food.id === action.id &&
          food.size === action.size &&
          food.user === localStorage.getItem("email")
        ) {
          return {
            ...food,
            qty: parseInt(action.qty) + parseInt(food.qty),
            price: action.price + food.price,
          };
        }
        return food;
      });

    case "Drop":
      const arr = [...state];
      const newArray = arr.filter(
        (food) => food.user !== localStorage.getItem("email")
      );
      return newArray;

    default:
      console.log("Error in the reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

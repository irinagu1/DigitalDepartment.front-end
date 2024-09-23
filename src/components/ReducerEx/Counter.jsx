import { Button } from "@mui/material";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment": {
        return { count: state.count + 1 };
    }
    case "decrement": {
        return {
        count: state.count - 1,
      };
    }
    case "reset":
      {
        return {
          count: action.payload,
        };
      }
      defalut: {
        return state;
      }
  }
};

export default function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  function increment() {
    dispatch({ type: "increment" });
  }
  function decrement() {
    dispatch({ type: "decrement" });
  }
  function reset() {
    dispatch({ type: "reset", payload: initialCount });
  }
  return (
    <div>
      <p>{state.count}</p>
      <Button onClick={increment}>inc</Button>
      <Button onClick={decrement}>dec</Button>
      <Button onClick={reset}>reset</Button>
    </div>
  );
}

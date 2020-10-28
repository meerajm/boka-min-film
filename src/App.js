import React, { useReducer } from "react";
import Main from "./pages/Main";
import AppContext from "./store/context";
import store from "./store";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Main />
    </AppContext.Provider>
  );
}

export default App;

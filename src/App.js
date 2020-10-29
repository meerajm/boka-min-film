import React, { useReducer } from "react";
import { Router } from "@reach/router";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import BookTicket from "./pages/BookTicket";
import AppContext from "./store/context";
import store from "./store";

function App() {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Main path="main" />
        <MovieDetail path="details" />
        <BookTicket path="tickets" />
      </Router>
    </AppContext.Provider>
  );
}

export default App;

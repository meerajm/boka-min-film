import React, { useReducer } from "react";
import { Router } from "@reach/router";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import BookTicket from "./pages/BookTicket";
import SeatLayout from "./components/SeatLayout";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import UserDetails from "./components/UserDetails";
import MovieTiming from "./components/MovieTimings";
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
        <SeatLayout path="seats" />
        <Payment path="payment" />
        <UserDetails path="user" />
        <MovieTiming path="confirm" />
        <ThankYou path="thank-you" />
      </Router>
    </AppContext.Provider>
  );
}

export default App;

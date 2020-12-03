import React, { useEffect, useReducer } from "react";
import { Router } from "@reach/router";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import BookTicket from "./pages/BookTicket";
import TicketDetail from "./pages/TicketDetail";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import Header from "./components/Header";
import SeatLayout from "./pages/SeatLayout";
import UserDetails from "./pages/UserDetails";
import MovieTiming from "./pages/MovieTimings";
import Footer from "./components/Footer";
import AppContext from "./store/context";
import store from "./store";

function App() {
  const localState = JSON.parse(localStorage.getItem("allContent"));
  const [state, dispatch] = useReducer(
    store.reducer,
    localState || store.initialState
  );

  useEffect(() => {
    localStorage.setItem("allContent", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Header />
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Main path="/" />
          <MovieDetail path="details" />
          <BookTicket path="tickets" />
          <SeatLayout path="seats" />
          <UserDetails path="user-details" />
          <Payment path="payment" />
          <MovieTiming path="confirm" />
          <TicketDetail path="ticket-details" />
          <ThankYou path="thank-you" />
        </Router>
      </AppContext.Provider>
      <Footer />
    </>
  );
}

export default App;

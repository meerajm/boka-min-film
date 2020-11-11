import React, { useReducer } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Router } from "@reach/router";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import BookTicket from "./pages/BookTicket";
import SeatLayout from "./components/SeatLayout";
import Payment from "./pages/Payment";
import ThankYou from "./pages/ThankYou";
import Header from "./components/Header";
import UserDetails from "./components/UserDetails";
import MovieTiming from "./components/MovieTimings";
import Footer from "./components/Footer";
import AppContext from "./store/context";
import store from "./store";

function App() {
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  return (
    <>
      <Header />
      <div>
        <Trans i18nKey="title">Hello and welcome to BokaMinFilm</Trans>
        <div>{t("description.part1")}</div>
      </div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Main path="main" />
          <MovieDetail path="details" />
          <BookTicket path="tickets" />
          <SeatLayout path="seats" />
          <UserDetails path="user-details" />
          <Payment path="payment" />
          <MovieTiming path="confirm" />
          <ThankYou path="thank-you" />
        </Router>
      </AppContext.Provider>
      <Footer />
    </>
  );
}

export default App;

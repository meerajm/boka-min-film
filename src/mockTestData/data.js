import React from "react";
import { Router } from "@reach/router";
import AppContext from "../store/context";

export const getTestStore = () => {
  return {
    dispatch: () => {},
    state: {
      movies: [
        {
          _id: "123123123",
          title: "Avengers: Infinity War",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
          language: "Engelsk",
          genre: "Action",
          description:
            "Avengers måste hindra Thanos, en intergalaktisk krigsherre, från att ta händerna på alla oändlighetsstenarna. Thanos är dock beredd att gå långt för att genomföra sin galen plan.",
          trailer: "https://www.youtube.com/embed/03-KVRmd3xo",
        },
      ],
      cinemaNames: [
        {
          _id: "123",
          cinemaName: "INOX",
        },
      ],
      selectedMovie: {
        title: "Welcome",
        poster:
          "https://m.media-amazon.com/images/M/MV5BZjcyOTViMzUtOWQ5Yy00ZTVmLWJmYzctN2U2OGVlN2ZjNTA0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        language: "Hindi",
        genre: "Komedi",
        description:
          "Två skurkar möter Rajeev, som tillhör en respektabel familj, och vill fixa sin systers bröllop med honom. Men när Rajeevs farbror vägrar att matcha, inträffar en serie roliga situationer.",
        trailer: "https://www.youtube.com/embed/03-KVRmd3xo",
      },
    },
  };
};

export const WithProvider = (props) => {
  const { state, dispatch } = getTestStore();
  const { children } = props;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>{children}</Router>
    </AppContext.Provider>
  );
};

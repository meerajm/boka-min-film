import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import Movies from "../index";
import { WithProvider } from "../../../mockTestData/data";

const movie = {
  title: "Welcome",
  poster:
    "https://m.media-amazon.com/images/M/MV5BZjcyOTViMzUtOWQ5Yy00ZTVmLWJmYzctN2U2OGVlN2ZjNTA0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  language: "Hindi",
  genre: "Komedi",
  description:
    "Två skurkar möter Rajeev, som tillhör en respektabel familj, och vill fixa sin systers bröllop med honom. Men när Rajeevs farbror vägrar att matcha, inträffar en serie roliga situationer.",
  trailer: "https://www.youtube.com/embed/03-KVRmd3xo",
};

async function renderWrapper() {
  let component;
  act(() => {
    component = render(
      <WithProvider>
        <Movies path="/" movie={movie} />
      </WithProvider>
    );
  });
  return component;
}

describe.only("Movies component testing", () => {
  test("should render Movie component", async () => {
    const { getByTestId } = await renderWrapper();
    const movieCard = await waitFor(() => getByTestId("movie-card"));
    expect(movieCard).toBeInTheDocument();
  });

  test("Renders movie poster", async () => {
    const { getByTestId } = await renderWrapper();
    const moviePoster = await waitFor(() => getByTestId("movie-poster"));
    expect(moviePoster).toHaveAttribute("src", `${movie.poster}`);
  });

  test("Renders movie title", async () => {
    const { getByTestId } = await renderWrapper();
    const movieTitle = await waitFor(() => getByTestId("movie-title"));
    expect(movieTitle.innerHTML).toBe(movie.title);
  });
});

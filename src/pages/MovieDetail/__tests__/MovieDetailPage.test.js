import React from "react";
import MovieDetails from "..";
import { render, act, waitFor } from "@testing-library/react";
import AppContext from "../../../store/context";
import { getTestStore, WithProvider } from "../../../mockTestData/data";

async function renderWrapper() {
  let component;
  
  act(() => {
    component = render(
      <WithProvider>
        <MovieDetails path="/" />
      </WithProvider>
    );
  });
  return component;
}

describe.skip("Movie details page testing", () => {
  test("should render Movie details page", async () => {
    const { getByTestId } = await renderWrapper();
    const movieDetails = await waitFor(() => getByTestId("movie-details"));
    expect(movieDetails).toBeInTheDocument();
  });

  test("Renders movie title", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const movieTitle = await waitFor(() => getByTestId("movie-title"));
    expect(movieTitle.innerHTML).toBe(state.movies.title);
  });
});

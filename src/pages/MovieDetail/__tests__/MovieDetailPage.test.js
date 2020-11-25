import React from "react";
import MovieDetails from "..";
import * as router from "@reach/router";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
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

describe.only("Movie details page testing", () => {
  test("should render Movie details page", async () => {
    const { getByTestId } = await renderWrapper();
    const movieDetails = await waitFor(() => getByTestId("movie-details"));
    expect(movieDetails).toBeInTheDocument();
  });

  test("Renders movie title", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const movieTitle = await waitFor(() => getByTestId("movie-title"));
    expect(movieTitle.innerHTML).toBe(state.selectedMovie.title);
  });

  test("Renders movie language", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const movieLanguage = await waitFor(() => getByTestId("movie-language"));
    expect(movieLanguage.innerHTML).toBe(state.selectedMovie.language);
  });

  test("Renders movie genre", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const movieGenre = await waitFor(() => getByTestId("movie-genre"));
    expect(movieGenre.innerHTML).toBe(state.selectedMovie.genre);
  });

  test("Renders movie description", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const movieDescription = await waitFor(() =>
      getByTestId("movie-description")
    );
    expect(movieDescription.innerHTML).toBe(state.selectedMovie.description);
  });

  test("Renders movie poster", async () => {
    const { getByTestId } = await renderWrapper();
    const { state } = getTestStore();
    const moviePoster = await waitFor(() => getByTestId("movie-poster"));
    expect(moviePoster).toHaveAttribute("src", `${state.selectedMovie.poster}`);
  });

  test("Renders tickets button", async () => {
    const { getByTestId } = await renderWrapper();
    const ticketsBtn = await waitFor(() => getByTestId("tickets-btn"));
    expect(ticketsBtn).toBeInTheDocument();
    const navigateSpy = jest.spyOn(router, "navigate");
    fireEvent.click(ticketsBtn);
    await waitFor(() => expect(navigateSpy).toHaveBeenCalledTimes(1));
    expect(navigateSpy).toHaveBeenCalledWith("./tickets");
  });
});

import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import Main from "..";
import mockedAxios from "../../../__mocks__/axios";
import { WithProvider } from "../../../mockTestData/data";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <Main path="/" />
      </WithProvider>
    );
  });
  return component;
}

describe("Movie details page testing", () => {
  beforeEach(() => {
    const movieData = {
      data: [
        {
          _id: "123123123",
          title: "Avengers: Infinity War",
          poster:
            "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
          language: "Engelsk",
          genre: "Action",
          description:
            "Avengers måste hindra Thanos, en intergalaktisk krigsherre, från att ta händerna på alla oändlighetsstenarna. Thanos är dock beredd att gå långt för att genomföra sin galen plan.",
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(movieData);
    const cinemaData = {
      data: [
        {
          _id: "123",
          cinemaName: "INOX",
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(cinemaData);
  });

  test("mocking axios request", async () => {
    const { getByText } = await renderWrapper();
    await waitFor(() => {
      expect(getByText("Avengers: Infinity War"));
    });
  });

  test("should render Main page", async () => {
    const { getByTestId } = await renderWrapper();
    const mainContainer = await waitFor(() => getByTestId("main-container"));
    expect(mainContainer).toBeInTheDocument();
  });
});

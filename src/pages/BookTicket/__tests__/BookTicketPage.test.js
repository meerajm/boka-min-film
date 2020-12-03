import React from "react";
import BookTicket from "..";
import * as router from "@reach/router";
import { render, act, waitFor, fireEvent } from "@testing-library/react";
import { getTestStore, WithProvider } from "../../../mockTestData/data";

async function renderWrapper() {
  let component;

  act(() => {
    component = render(
      <WithProvider>
        <BookTicket path="/" />
      </WithProvider>
    );
  });
  return component;
}

describe("Book ticket page testing", () => {
  test("should render Book ticket page", async () => {
    const { getByTestId } = await renderWrapper();
    const bookTicket = await waitFor(() => getByTestId("book-ticket"));
    expect(bookTicket).toBeInTheDocument();
  });
});

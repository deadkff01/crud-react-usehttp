import React from "react";
import { screen, act } from "@testing-library/react";
import { renderWithRouter } from "./testUtils";
import App from "./App";
import "./setupTests";
import { server, getItems, getItemById } from "__mocks__/server";

describe("App component", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    jest.useRealTimers();
    server.close();
  });

  test("full app rendering / navigating to item", async () => {
    const {
      history: { navigate },
    } = renderWithRouter(<App />);

    server.use(getItems());

    await screen.findAllByTestId("item-card");

    await navigate("/item/1");

    await act(async () => {
      server.use(getItemById(1));
    });

    const input = await screen.findByTestId("input-name");
    expect(input.value).toBe("Nintendo Switch");
  });
});

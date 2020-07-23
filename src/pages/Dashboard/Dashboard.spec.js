import React from "react";
import { cleanup, waitForElement, screen, act } from "@testing-library/react";
import { renderWithRouter } from "../../testUtils";
import Dashboard from "./Dashboard";
import "../../setupTests";
import { server, getItems, getItemsError } from "__mocks__/server";

describe("Dashboard component", () => {
  beforeAll(() => {
    server.listen();
    jest.useRealTimers();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    jest.useRealTimers();
    server.close();
    cleanup();
  });

  test("renders the component", async () => {
    const { getByTestId } = renderWithRouter(<Dashboard />);
    await act(async () => {
      server.use(getItems());
    });
    const element = await waitForElement(() => getByTestId("container"));
    expect(element).toMatchSnapshot();
  });

  test("renders the loader", async () => {
    jest.useFakeTimers();
    const { getByTestId } = renderWithRouter(<Dashboard />);
    server.use(getItems());
    const element = await waitForElement(() => getByTestId("spinner-loader"));
    expect(element).toBeDefined();
  });

  test("renders the error", async () => {
    jest.useRealTimers(); // problem to be reviewed
    renderWithRouter(<Dashboard />);
    server.use(getItemsError());
    const element = await screen.findByTestId("error");
    expect(element).toBeDefined();
  });

  test("item cards count", async () => {
    renderWithRouter(<Dashboard />);
    server.use(getItems());
    const element = await screen.findAllByTestId("item-card");
    expect(element.length).toBe(2);
  });
});

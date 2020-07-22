import React from "react";
import {
  cleanup,
  waitForElement,
  fireEvent,
  wait,
  screen,
  act,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithRouter } from "../../testUtils";
import Dashboard from "./Dashboard";
import itemsMock from "__mocks__/items";
import "../../setupTests";

const server = setupServer();

const getItems = () =>
  rest.get("http://localhost:8080/get-items", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(itemsMock));
  });

const getItemsError = () =>
  rest.get("http://localhost:8080/get-items", (_, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
  });

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
    await act(async () => {
      server.use(getItems());
    });
    const element = await waitForElement(() => getByTestId("spinner-loader"));
    expect(element).toBeDefined();
  });

  test("renders the error", async () => {
    jest.useRealTimers(); // problem to be reviewed
    const { getByTestId } = renderWithRouter(<Dashboard />);
    await act(async () => {
      server.use(getItemsError());
    });
    const element = await waitForElement(() => getByTestId("error"));
    expect(element).toBeDefined();
  });

  test("item cards count", async () => {
    const { getAllByTestId } = renderWithRouter(<Dashboard />);
    await act(async () => {
      server.use(getItems());
    });
    const element = await waitForElement(() => getAllByTestId("item-card"));
    expect(element.length).toBe(2);
  });
});

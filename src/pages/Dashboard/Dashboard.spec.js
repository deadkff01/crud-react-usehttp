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

describe("Dashboard component", () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    jest.useFakeTimers();
    server.resetHandlers();
  });

  afterAll(() => {
    jest.useRealTimers();
    server.close();
  });

  test("renders the component", async () => {
    const { getAllByTestId } = renderWithRouter(<Dashboard />);
    await act(async () => {
      server.use(
        rest.get("http://localhost:8080/get-items", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(itemsMock));
        })
      );
    });
    const element = await waitForElement(() => getAllByTestId("container"));
    expect(element).toMatchSnapshot();
  });

  test("renders the loader", async () => {
    const { getAllByTestId } = renderWithRouter(<Dashboard />);
    await act(async () => {
      server.use(
        rest.get("http://localhost:8080/get-items", (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(itemsMock));
        })
      );
    });
    const element = await waitForElement(() =>
      getAllByTestId("spinner-loader")
    );
    expect(element).toBeDefined();
  });
});

import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { renderWithRouterParams } from "../../testUtils";
import Item from "./Item";
import "../../setupTests";
import { server, getItemById } from "__mocks__/server";

describe("Item component", () => {
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
    jest.useFakeTimers();
    renderWithRouterParams(<Item path="/item/:id" />, { route: "/item/1" });

    server.use(getItemById(1));

    const element = await screen.findByTestId("container-item");
    expect(element).toMatchSnapshot();
  });
});

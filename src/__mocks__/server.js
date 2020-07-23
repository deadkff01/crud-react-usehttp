import { rest } from "msw";
import { setupServer } from "msw/node";
import itemsMock from "__mocks__/items";

export const server = setupServer();

export const getItems = () =>
  rest.get("http://localhost:8080/get-items", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(itemsMock));
  });

export const getItemById = (id) =>
  rest.get(`http://localhost:8080/get-item-by-id/${id}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(itemsMock.find((i) => i.id === id)));
  });

export const getItemsError = () =>
  rest.get("http://localhost:8080/get-items", (_, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
  });

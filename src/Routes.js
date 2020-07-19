import React from "react";
import { Router } from "@reach/router";
import Dashboard from "pages/Dashboard";
import Item from "pages/Item";
import AddItem from "pages/AddItem";

const Routes = () => (
  <Router>
    <Dashboard path="/" default />
    <Item path="/item/:id" />
    <AddItem path="/add-item" />
  </Router>
);

export default Routes;

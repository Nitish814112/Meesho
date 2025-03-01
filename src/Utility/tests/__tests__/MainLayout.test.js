import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import MainLayout from "../../../component/MainLayout/MainLayout.jsx";
import "@testing-library/jest-dom"; // Ensure this is imported

const mockStore = configureStore([]);

test("initial load of website always starts with / route", () => {
  const store = mockStore({
    cart: {
      cartItems: [], // 🛠 Mock cart state to prevent undefined error
    },
    products: { items: [], status: "idle", error: null },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    </Provider>
  );

  expect(window.location.pathname).toBe("/");
});

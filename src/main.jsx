import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProvider from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AppProvider>
          <Toaster position="top-right" />
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import Layout from "./components/Layout.jsx";
import '@mantine/core/styles.css';
import { mantineTheme } from "./styles/theme.js";
import { BrowserRouter, Route } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);

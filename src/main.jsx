import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { mantineTheme } from "./styles/theme.js";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={mantineTheme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);
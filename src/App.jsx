import { useState } from "react";
import "./App.css";
import { useFullscreen } from "@mantine/hooks";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;

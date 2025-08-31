import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import rutas from "./services/routing";
import { Web3Providers } from "./services/wagmi";

function App() {
  return (
    <Web3Providers>
      <Layout>
        <Routes>
          {rutas.map((ruta) => {
            const Component = ruta.component;
            return (
              <Route
                key={ruta.route}
                path={ruta.route}
                element={<Component />}
              />
            );
          })}
        </Routes>
      </Layout>
    </Web3Providers>
  );
}

export default App;
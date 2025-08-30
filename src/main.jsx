import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import { mantineTheme } from "./styles/theme.js";
import { BrowserRouter } from "react-router";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Configura las chains que vas a usar
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'REDE Community',
  projectId: 'YOUR_PROJECT_ID', // Obtén esto de walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
              <App />
            </MantineProvider>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
import {createConfig, http} from "wagmi";
import {WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RainbowKitProvider, getDefaultWallets, darkTheme} from "@rainbow-me/rainbowkit";
import {defineChain} from "viem";

import "@rainbow-me/rainbowkit/styles.css";

const chainId = Number(import.meta.env.VITE_PUBLIC_CHAIN_ID || 11155111);
const rpcUrl = import.meta.env.VITE_PUBLIC_RPC_URL || "https://rpc.sepolia.org";

export const customChain = defineChain({
    id: chainId,
    name: chainId === 11155111 ? "Sepolia" : `Chain ${chainId}`,
    nativeCurrency: {name: "Ether", symbol: "ETH", decimals: 18},
    rpcUrls: {default: {http: [rpcUrl]}},
});

const {connectors} = getDefaultWallets({
    appName: "REDE",
    projectId: "4b2958e72fd89957a4d40e383d46e7ea", // opcional si usas WalletConnect v2 con key
    chains: [customChain],
});

export const config = createConfig({
    chains: [customChain],
    transports: {[customChain.id]: http(rpcUrl)},
    connectors,
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // No reintentar si es rate limiting (429)
                if (error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
                    return false;
                }
                return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            staleTime: 30000, // 30 segundos por defecto
            cacheTime: 300000, // 5 minutos por defecto
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

export function Web3Providers({children}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()} chains={[customChain]}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

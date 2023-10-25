import "./App.css";
import Minter from "./minter.jsx";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia,
  goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

function App() {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
    [
      alchemyProvider({ apiKey: "Gkp6cVbHx1hZQ_NUmTHJlJ_eqOdKniJb" }),
      publicProvider(),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "fe7e3ca9a5e25e44dd79680ab9edec8e",
    chains,
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Minter/>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;

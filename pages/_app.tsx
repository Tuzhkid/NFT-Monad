import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { Chain } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";

// Define your custom chain
const customChain: Chain = {
  chain: "ETH",
  chainId: 10143, // Your custom chain ID
  name: "Monad Testnet",
  rpc: [
    "https://testnet-rpc2.monad.xyz/52227f026fa8fac9e2014c58fbf5643369b3bfc6",
  ],
  nativeCurrency: {
    name: "Monad",
    symbol: "TMON",
    decimals: 18,
  },
  explorers: [
    {
      url: "https://testnet.monadexplorer.com/",
      name: "Monad testnet explorer",
      standard: "none",
    },
  ],
  shortName: "monad",
  slug: "monad",
  testnet: true,
};

const queryClient = new QueryClient();
// da80524de436716df3e7c21106b666ed 5ec9d980533be21c962580687677c0f9

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) return;

    const password = prompt("Enter password:");

    if (password === "naddevfeb2025") {
        setIsAuthenticated(true);
    } else {
        alert("Unauthorized");
        window.location.href = "about:blank"; // Prevents access
    }
}, [isAuthenticated]);

  return isAuthenticated ? (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider
        secretKey="sx26XL_aTHOHv0BEX4IFPYYLL_4VfsTsXpQkyJP_WsTgC_ndNm3mis3jB2vSOsQj96svIEvDYmjfYbhKUo-tqg"
        activeChain={customChain}
        clientId="da80524de436716df3e7c21106b666ed"
        queryClient={queryClient}
      >
        <Head>
          <title>Nads ID</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="NFT Drop minting page" />
          <meta
            name="keywords"
            content="Thirdweb, thirdweb NFT drop, how to make thirdweb nft drop, how to make nft collection thirdweb"
          />
        </Head>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </QueryClientProvider>
  ) : null;
}

export default MyApp;

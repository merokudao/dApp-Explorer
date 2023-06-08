import { Provider } from "react-redux";
import { store } from "../store";
import type { AppProps } from "next/app";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Session } from "next-auth";

import Layout from "../components/layout";
import { wagmiConfig } from "../features/wallet_connect";
import { WagmiConfig } from "wagmi";
import { chains } from "../features/wallet_connect/config";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import {
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
	variable: "--font-poppins",
	display: "swap",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	const TypeFixedComponent = Component as any;

	return (
		<>
			<style jsx global>{`
				:root {
					--font-poppins: ${poppins.style.fontFamily};
				}
			`}</style>
			<main className={`${poppins.variable} font-sans`}>
				<Provider store={store}>
					{/* This provides all the necssary config for wallet connections */}
					<WagmiConfig config={wagmiConfig}>
						{/* Session store and rainbow kit store is used for authenticting wallet */}
						<SessionProvider
							refetchInterval={0}
							session={pageProps.session}
						>
							<RainbowKitSiweNextAuthProvider>
								{/* Rainbow kit is being used for wallet conection */}
								<RainbowKitProvider
									chains={chains}
									theme={lightTheme({
										borderRadius: "medium",
										fontStack: "system",
									})}
								>
									<Layout>
										<TypeFixedComponent {...pageProps} />
									</Layout>
								</RainbowKitProvider>
							</RainbowKitSiweNextAuthProvider>
						</SessionProvider>
					</WagmiConfig>
				</Provider>
			</main>
		</>
	);
}
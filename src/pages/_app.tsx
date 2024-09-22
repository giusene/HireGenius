import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import NavBar from "@/components/Molecules/NavBar/NavBar";
import Footer from "@/components/Molecules/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</AuthProvider>
	);
}

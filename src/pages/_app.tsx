import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import NavBar from "@/components/Molecules/NavBar/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

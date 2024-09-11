// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { auth, googleProvider, db } from "../lib/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const loginWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;

			// Salva l'utente in Firestore
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				email: user.email,
			});

			console.log("Login con Google effettuato con successo!");
		} catch (error) {
			console.error("Errore durante il login con Google:", error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Errore durante il logout:", error);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			console.log("Utente aggiornato nel context:", firebaseUser); // Debug log
			setUser(firebaseUser);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user, login, loginWithGoogle, logout }}> {children}</AuthContext.Provider>;
};

// Hook per il contesto di autenticazione
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth deve essere usato all’interno di un AuthProvider");
	}
	return context;
};

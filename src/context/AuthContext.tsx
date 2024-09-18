import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, googleProvider, db } from "../lib/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error("Le credenziali inserite non sono corrette.");
      } else {
        throw new Error("Errore sconosciuto durante il login.");
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user || !user.uid) {
        throw new Error("Informazioni utente non disponibili dopo il login.");
      }

      const userDocRef = doc(db, "users", user.uid);

      // Verifica se il documento esiste
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Documento non esistente, crea
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
        });
      }

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

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email di recupero password inviata con successo!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error("Errore durante il recupero della password.");
      } else {
        throw new Error(
          "Errore sconosciuto durante il recupero della password."
        );
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Utente aggiornato nel context:", firebaseUser);
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, loginWithGoogle, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook per il contesto di autenticazione
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato in un AuthProvider");
  }
  return context;
};

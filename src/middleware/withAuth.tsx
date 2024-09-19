//src/middleware/withAuth.tsx

import React, { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "@/components/Atoms/Loading/Loading";

const withAuth = <P extends object>(Component: ComponentType<P>) => {
	const AuthenticatedComponent = (props: P) => {
		const { user } = useAuth();
		const router = useRouter();
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			console.log("Utente nel HOC:", user); // Debug log
			if (user === null) {
				router.replace("/login");
			} else {
				setLoading(false);
			}
		}, [user, router]);

		if (loading) {
			return <Loading />;
		}

		if (!user) {
			return null; // Renderizza nulla se l'utente non è autenticato
		}

		return <Component {...props} />;
	};

	return AuthenticatedComponent;
};

export default withAuth;

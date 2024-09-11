// src/pages/protected.tsx

import React from "react";
import withAuth from "../middleware/withAuth";
import Link from "next/link";

const ProtectedPage = () => {
  return (
    <div>
      <h1>Pagina Protetta</h1>
      <p>Solo gli utenti autenticati possono vedere questo contenuto.</p>
      <Link href="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
};

export default withAuth(ProtectedPage);

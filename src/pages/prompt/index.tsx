import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Prompt = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ question: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "Ponimi 5 domande tecniche come se mi stessi candidando per la posizione di Junior Front End Developer.",
        }),
      });

      if (!response.ok) {
        throw new Error("Errore nella richiesta al server.");
      }

      const result = await response.json();
      const parsedData = JSON.parse(result);
      setData(parsedData);
      console.log("Questions generated successfully", parsedData);
    } catch (e) {
      console.error("Error generating questions", e);
      setError(
        e instanceof Error
          ? e.message
          : "Errore sconosciuto durante la generazione delle domande."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generazione in corso..." : "Genera Domande"}{" "}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {loading && <p>Caricamento in corso...</p>}{" "}
        {data.length > 0 && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.question}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Prompt;

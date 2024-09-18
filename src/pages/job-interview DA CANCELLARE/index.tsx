import { useState } from "react";

const PROMPT = `Immagina di essere un esaminatore per un colloquio tecnico per una posizione di Junior Front End Developer. 
  Ponimi 5 domande tecniche di difficoltà crescente, partendo da domande di base fino a domande più avanzate. 
  I requisiti sono: HTML, CSS, JavaScript e React.`;

const JobInterview = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ question: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);

    const maxRetries = 3; // Numero massimo di tentativi
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        const response = await fetch("/api/generate-question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: PROMPT }),
        });

        if (!response.ok) {
          throw new Error("Errore nella richiesta al server.");
        }

        const result = await response.json();
        const parsedData = JSON.parse(result);
        setData(parsedData);
        success = true;
        console.log("Questions generated successfully", parsedData);
      } catch (e) {
        console.error("Error generating questions", e);
        attempt++;
        if (attempt >= maxRetries) {
          setError(
            e instanceof Error
              ? e.message
              : "Errore sconosciuto durante la generazione delle domande."
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generazione in corso..." : "Genera Domande"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Caricamento in corso...</p>}
        {data.length > 0 && (
          <ol>
            {data.map((item, index) => (
              <li key={index}>{item.question}</li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};

export default JobInterview;

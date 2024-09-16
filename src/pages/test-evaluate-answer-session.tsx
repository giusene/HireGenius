import { useState } from "react";

// Definizione dei tipi
interface Answer {
  q: string; // Domanda
  a: string; // Risposta fornita dall'utente
}

interface IndividualEvaluation {
  q: string; // Domanda valutata
  a: string; // Risposta fornita dall'utente
  correctAnswer: string; // Risposta corretta
  status: "correct" | "average" | "incorrect"; // Stato della risposta
  evaluation: string; // Commento sulla valutazione
}

interface GlobalEvaluation {
  outOf: number; // Totale delle risposte
  points: number; // Punteggio ottenuto
  result: string; // Commento globale sulla prestazione
}

interface EvaluationResults {
  globalEvaluation?: GlobalEvaluation; // Valutazione globale (opzionale)
  answers: IndividualEvaluation[]; // Valutazioni per singola risposta
}

const EvaluateAnswerSession = () => {
  const originalAnswers: Answer[] = [
    //Mock Question/Answer
    {
      q: "Che differenza c'è tra `var`, `let` e `const` in JavaScript?",
      a: "La differenza principale è che `var` ha uno scope globale o di funzione, mentre `let` e `const` hanno uno scope di blocco. `let` permette la riassegnazione, mentre `const` no.",
    },
    {
      q: "Qual è la differenza tra `==` e `===` in JavaScript?",
      a: "`==` confronta i valori dopo aver effettuato una conversione di tipo, mentre `===` confronta sia i valori che i tipi senza effettuare conversioni.",
    },
    {
      q: "Come funziona il modello di rendering di React?",
      a: "React utilizza un DOM virtuale per ottimizzare le operazioni di rendering. Quando lo stato o le props di un componente cambiano, React aggiorna il DOM virtuale e poi confronta le modifiche con il DOM reale per applicare solo le differenze.",
    },
    {
      q: "Cos'è il CSS Grid e come si utilizza?",
      a: "Il CSS Grid è un layout system che permette di creare layout complessi con una sintassi semplice. Utilizza righe e colonne per posizionare gli elementi e può essere utilizzato per creare design responsive e flessibili.",
    },
    {
      q: "Quali sono le differenze tra funzioni normali e arrow functions in JavaScript?",
      a: "Le arrow functions non hanno il proprio `this`, ma ereditano `this` dal contesto di dichiarazione. Inoltre, non hanno il proprio `arguments` e non possono essere utilizzate come costruttori.",
    },
  ];

  const [evaluationResults, setEvaluationResults] =
    useState<EvaluationResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prompt = `Valuta le seguenti risposte fornite durante un colloquio tecnico per una posizione di Junior Front End Developer. Per ogni risposta, fornisci:
1. Uno status: correct | average | incorrect.
2. Una valutazione con breve spiegazione.
3. La risposta corretta.

Alla fine, fornisci una sintetica valutazione globale con un punteggio finale su 100 e una breve frase che riassuma le prestazioni generali del candidato (ad esempio: "Hai superato il test", "Hai dimostrato buone competenze", "Devi migliorare").`;

  const evaluateAnswers = async () => {
    setLoading(true);
    setError(null);

    const maxRetries = 5; // Numero massimo di tentativi
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
      try {
        const payload = { prompt, answers: originalAnswers };
        console.log("Payload inviato:", payload); // Log del payload inviato

        const response = await fetch("/api/evaluate-answer-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 429) {
          throw new Error("Too Many Requests - Rate limit exceeded");
        }

        if (!response.ok) {
          throw new Error("Errore nella richiesta di valutazione.");
        }

        const result: EvaluationResults = await response.json();
        console.log("Risultato della valutazione:", result); // Log del risultato della valutazione
        setEvaluationResults(result);
        success = true;
      } catch (e) {
        console.error("Errore durante la valutazione:", e);
        attempt++;
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Escalazione esponenziale
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          setError(
            e instanceof Error
              ? e.message
              : "Errore sconosciuto durante la valutazione."
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="evaluate-answer-session">
      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Caricamento in corso...</p>}

      {/* Mostra le risposte originali */}
      {originalAnswers.length > 0 && (
        <div className="original-answers">
          <h2>Risposte Originali</h2>
          <ol>
            {originalAnswers.map((answer, index) => (
              <li key={index}>
                <strong>Domanda:</strong> {answer.q}
                <br />
                <strong>Risposta:</strong> {answer.a}
              </li>
            ))}
          </ol>
        </div>
      )}

      <button onClick={() => evaluateAnswers()} disabled={loading}>
        {loading ? "Valutazione in corso..." : "Valuta Risposte"}
      </button>

      {/* Mostra i risultati della valutazione */}
      {evaluationResults ? (
        <div className="evaluation-results">
          {evaluationResults.globalEvaluation && (
            <>
              <h2>Valutazione Globale</h2>
              <p>
                <strong>Punteggio finale:</strong>{" "}
                {evaluationResults.globalEvaluation.points}/
                {evaluationResults.globalEvaluation.outOf}
                <br />
                <strong>Commento:</strong>{" "}
                {evaluationResults.globalEvaluation.result}
              </p>
            </>
          )}

          {/* Dettagli delle valutazioni */}
          {evaluationResults.answers.length > 0 ? (
            <div className="individual-evaluations">
              <h2>Dettagli Valutazioni</h2>
              <ol>
                {evaluationResults.answers.map((evaluation, index) => (
                  <li
                    key={index}
                    className={`evaluation-card ${evaluation.status}`}
                  >
                    <strong>Domanda:</strong> {evaluation.q}
                    <br />
                    <strong>Risposta fornita:</strong> {evaluation.a}
                    <br />
                    <strong>Risposta corretta:</strong>{" "}
                    {evaluation.correctAnswer}
                    <br />
                    <strong>Stato:</strong>{" "}
                    {evaluation.status === "correct"
                      ? "Giusta"
                      : evaluation.status === "average"
                      ? "Parzialmente corretta"
                      : "Sbagliata"}
                    <br />
                    <strong>Commento:</strong> {evaluation.evaluation}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p>Nessuna valutazione disponibile per le risposte fornite.</p>
          )}
        </div>
      ) : (
        <p>Nessun risultato di valutazione disponibile.</p>
      )}
    </div>
  );
};

export default EvaluateAnswerSession;

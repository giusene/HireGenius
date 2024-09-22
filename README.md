# HireGenius
  
**HireGenius** è un'applicazione innovativa progettata per aiutare i candidati junior, gli studenti e chiunque desideri prepararsi in modo efficace per colloqui, interrogazioni o quiz. Utilizzando la potenza dell'intelligenza artificiale, l'app offre simulazioni personalizzabili che permettono di affrontare domande in modo realistico e interattivo.

## Descrizione
  
**HireGenius** sfrutta un sistema di intelligenza artificiale per generare simulazioni di colloqui e quiz in modo interattivo. Gli utenti possono scegliere i diversi livelli di difficoltà, selezionare il numero di domande e interagire con un "intervistatore" virtuale, rappresentato da uno dei sei avatar disponibili. Ogni avatar ha una propria personalità, metodo di esame e modalità di giudizio, rendendo l'esperienza di apprendimento unica e coinvolgente.

L'app è dotata di una **navbar laterale** che consente una navigazione semplice e intuitiva tra le diverse sezioni. Gli utenti possono visualizzare uno **storico dei quiz** effettuati, con la possibilità di rivedere nel dettaglio le simulazioni passate per identificare le aree di miglioramento.

Per utilizzare l'app, gli utenti possono **registrarsi** o **accedere tramite Google**, sfruttando il backend di **Firebase** per la gestione degli utenti e dei dati. È inoltre disponibile un'opzione per **recuperare la password**, garantendo un accesso sicuro e semplice.

### Caratteristiche:

  

-  **Tecnologie utilizzate**: L'app è sviluppata con **Next.js**, **TypeScript** e utilizza **Module SCSS** per la gestione degli stili.

-  **Navbar laterale**: Facilita la navigazione attraverso le diverse sezioni dell'app.

-  **Difficoltà personalizzabile**: Scegli tra 6 avatar esaminatori, ognuno con una propria personalità, metodo di esame e giudizio.

-  **Numero di domande variabile**: Decidi quante domande vuoi affrontare nella simulazione, permettendo sessioni brevi o più lunghe.

-  **Storico quiz**: Rivedi i quiz precedenti nel dettaglio per monitorare i progressi.

-  **Registrazione e accesso**: Registrati facilmente o accedi con Google, con supporto per il recupero della password.

-  **Interfaccia utente intuitiva**: Costruita con Next.js, l'app offre un'esperienza fluida, con caricamenti rapidi e un design responsivo.

-  **Feedback immediato**: Ricevi valutazioni e suggerimenti basati sulle tue risposte per migliorare le tue performance.

  

## Per iniziare

Prima di installare il programma, assicurati di avere:

-  **Node.js** (versione 14 o superiore)

-  **npm** (incluso con Node.js)

### Installazione

Per installare l'applicazione, segui questi passaggi:

1.  **Clona il repository**:

```bash

`git clone https://github.com/giusene/HireGenius.git`

```

2.  **Naviga nella cartella del progetto**:

```bash

`cd HireGenius`

```

  

3.  **Installa le dipendenze**:

```bash

`npm install`

```

- Le dipendenze installate includono:

```bash
npm i next

npm i react

npm i react-dom

npm i firebase

npm i sass

npm install uuid

npm install @types/uuid --save-dev

npm install  @google/generative-ai

npm install  date-fns
```

### Esecuzione App

  
Dopo aver installato le dipendenze, puoi avviare l'applicazione seguendo questi passaggi: 

1.  **Avvia il server di sviluppo**:

```bash

`npm run dev`

```

2.  **Accedi all'app**:

Una volta avviata, apri il tuo browser e vai all'indirizzo:

```arduino

`http://localhost:3000`

```

Potrai così interagire con l'app, scegliere la difficoltà e iniziare la tua simulazione di colloquio.

  

### Suggerimenti per l'uso

  



  

-  **Sperimenta con diverse difficoltà**: Prova vari livelli di difficoltà per sfidare le tue capacità.

-  **Prendi appunti**: Durante la simulazione, annota le risposte che non conosci per studiarle successivamente.

-  **Ripeti le simulazioni**: Utilizza l'app più volte per migliorare le tue prestazioni e acquisire fiducia.

  

## Aiuto

Se incontri problemi comuni, controlla i seguenti punti:

-  **Errori di installazione**: Assicurati che tutte le dipendenze siano installate correttamente. Usa `npm install` per reinstallarle.

-  **Server non avviato**: Verifica il terminale per eventuali messaggi di errore durante l'avvio del server.

## GitHub e Vercel
  
Puoi trovare il codice dell'applicazione su GitHub al seguente link: [GitHub](https://github.com/giusene/HireGenius)

  

L'app è anche ospitata su Vercel, e puoi provarla in tempo reale qui: [Vercel ](https://hire-genius.vercel.app/)

  

## Autori

-  [Giovanni Raniolo](https://github.com/GiovanniRaniolo) 
-  [Bruna Alamia](https://github.com/majinbrum) 
-  [Silvia Melia](https://github.com/meliasil) 
-  [Chiara Corvitto](https://github.com/Birdofillome) 
-  [Ivan Saltaformaggio](https://github.com/Nikeandros) 

## Versione
  

-  **0.1**

      - -Rilascio iniziale con funzionalità di base.

## Licenza

Copyright (c) <YEAR> <COPYRIGHT HOLDERS>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
----------
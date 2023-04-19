import './App.css';

import React, { useState } from "react";
//Definiera komponenten som default export
// Deklarera fyra stycken state-variabler med hjälp av useState-hooken
export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessages] = useState("");
  const [isSuccessful, setSuccessful] = useState(false);


  // Deklarera en funktion som körs när användaren klickar på "Submit"-knappen
  const submit = async (e) => {
    e.preventDefault(); // Förhindra att formuläret skickas iväg och att sidan laddas om

    // Ta bort tecken som inte går att skicka med callet
    const encodedFirstName = encodeURIComponent(firstName);
    const encodedLastName = encodeURIComponent(lastName);

    // Validera att förnamn och efternamn har fyllts i
    const formValid = encodedFirstName.length > 0 && encodedLastName.length > 0;

    if (!formValid) {
      return; // Om formuläret inte är korrekt ifyllt, avbryt
    }

    

    // Skicka en asynkron fetch-request till en lokal server på port 4000 med användarens namn som query string-parametrar i URL:en
    const res = await fetch('http://localhost:4000/hello?firstName=' + encodedFirstName + '&lastName=' + encodedLastName);

    // Extrahera svaret från servern som en JSON-sträng
    const json = await res.json();

    //Sätt knappen till rosa när den klickas
    setSuccessful((currentState) => true);
    // Uppdatera state-variabeln message med hälsningen från servern
    setMessages(json.message);

  };

  // Rendera ett formulär och hälsningsmeddelande på sidan
  return (
    <div>
      <h1>Welcome to Apendo!</h1>
      <form onSubmit={submit}>
        <div>
          <label className='label'>Enter first name</label>
          <input required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className='label'>Enter last name</label>
          <input required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button style={{ backgroundColor: isSuccessful ? "pink" : "lightgrey" }} type="submit">Submit</button>
      </form>
      {message}
    </div>
  );
}

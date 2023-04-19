import './App.css';

import React, { useState } from "react";
//Definiera komponenten som default export
  // Deklarera tre stycken state-variabler med hjälp av useState-hooken
export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessages] = useState("");
  const [isliked, setLiked] = useState(false);

  const buttonHandler = () => {
    setLiked((currentState) => !currentState);
  };
   // Deklarera en funktion som körs när användaren klickar på "Submit"-knappen
  const submit = async (e) => {
    e.preventDefault(); // Förhindra att formuläret skickas iväg och att sidan laddas om

    // Validera att förnamn och efternamn har fyllts i
    const formValid = firstName.length > 0 && lastName.length > 0;
    if (!formValid) {
      return; // Om formuläret inte är korrekt ifyllt, avbryt
    }
    
    // Skapa ett objekt med användarens för- och efternamn
    const nameData = {firstName, lastName};
   
    // Konvertera objektet till en JSON-sträng
    const nameDataJson = JSON.stringify(nameData);

// Skicka en asynkron fetch-request till en lokal server på port 4000 med användarens namn som query string-parametrar i URL:en
    const res = await fetch('http://localhost:4000/hello?firstName='+firstName+'&lastName='+lastName);

    // Extrahera svaret från servern som en JSON-sträng
    const json = await res.json();

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
        <button onClick={buttonHandler}style={{ backgroundColor: isliked ? "pink" : "lightgrey" }} type="submit">Submit</button>
      </form>
      {message}
    </div>
  );
}

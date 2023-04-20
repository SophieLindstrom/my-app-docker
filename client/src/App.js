import './App.css';


import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//Definiera komponenten som default export
// Deklarera fyra stycken state-variabler med hjälp av useState-hooken
export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessages] = useState("");
  const [isSuccessful, setSuccessful] = useState(false);
 
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
  <div className='header-logo'><img width="200px" src="/apendo.png"/></div>
    <div className='container'>
      <h1>Welcome! </h1>
      <form onSubmit={submit}>
        <div>
          <input required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} placeholder='First name'
          />
        </div>
        <div>
          <input required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} placeholder='Last name'
          />
        </div>
        <div className='buttonClass'>
        <button onClick={handleOpen} style={{ backgroundColor: isSuccessful ? "rgb(114, 187, 6)" : "lightgrey" }} type="submit">Submit</button>
        <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description">
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
    {message}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    I am Ada, your Digital Assistant. How can I help you?
    </Typography>
  </Box>
</Modal>
        </div>
      </form>
    </div>
    </div>
  );
}

import './App.css';

import React, { useState } from 'react';
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [isSuccessfulGuest, setSuccessfulGuest] = useState(false);
  const [isSuccessfulUser, setSuccessfulUser] = useState(false);
  const [isSuccessfulEdit, setSuccessfulEdit] = useState(false);
  const [hasEdited, sethasEdited] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGuestClick = async () => {
  
    const res = await fetch('http://localhost:4000/hello');

    if (res.ok) {
      const json = await res.json();
      setSuccessfulGuest((currentState) => true);

      console.log('mess', json);

      setMessage(json.message);
      handleOpen();
    }
  };

  // Deklarera en funktion som körs när användaren klickar på "Submit"-knappen
  const submit = async (e) => {
    e.preventDefault(); // Förhindra att formuläret skickas iväg och att sidan laddas om

    // Ta bort tecken som inte går att skicka med callet
    const encodedFirstName = encodeURIComponent(firstName);
    const encodedLastName = encodeURIComponent(lastName);

    // Validera att förnamn och efternamn har fyllts i
    const formValid = encodedFirstName.length > 0 && encodedLastName.length > 0;

    if (!formValid) {
      return;
    }

    // Skicka en asynkron fetch-request till en lokal server på port 4000 med användarens namn som query string-parametrar i URL:en

    // Extrahera svaret från servern som en JSON-sträng

    const res = await fetch('http://localhost:4000/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!res.ok) {
      throw new Error('Något gick fel');
    }

    const json = await res.json();

    //Sätt knappen till grön när den klickas
    setSuccessfulUser((currentState) => true);

    // Uppdatera state-variabeln message med hälsningen från servern
    setMessage(json.message);
    setUserId(json.userId);

    handleOpen();
  };

  // Deklarera en funktion som körs när användaren klickar på "Edit"-knappen
  const edit = async (e) => {
    e.preventDefault(); // Förhindra att formuläret skickas iväg och att sidan laddas om

    // Ta bort tecken som inte går att skicka med callet
    const encodedFirstName = encodeURIComponent(firstName);
    const encodedLastName = encodeURIComponent(lastName);

    // Validera att förnamn och efternamn har fyllts i
    const formValid = encodedFirstName.length > 0 && encodedLastName.length > 0;

    if (!formValid) {
      return;
    }

    const res = await fetch('http://localhost:4000/hello', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, userId }),
    });

    if (!res.ok) {
      throw new Error('Något gick fel');
    }

    const json = await res.json();

    //Sätt knappen till grön när den klickas
    setSuccessfulEdit((currentState) => true);

    // Uppdatera state-variabeln message med hälsningen från servern
    setMessage(json.message);
    sethasEdited(true);
  };

  // Rendera ett formulär och hälsningsmeddelande på sidan
  return (
    <div>
      <div className="header-logo">
        <img width="200px" src="/apendo.png" />
      </div>
      <div className="container">
        <h1>Välkommen! </h1>
        <form className='main-form' onSubmit={submit}>
          <div className="input-wrapper">
            <div>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Förnamn"
              />
            </div>
            <div>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Efternamn"
              />
            </div>
          </div>

          <div className="buttonClass">
            <button
              style={{
                backgroundColor: isSuccessfulGuest
                  ? 'rgb(114, 187, 6)'
                  : 'lightgrey',
              }}
              onClick={() => {
                handleGuestClick();
              }}
              type="button"
            >
              Gäst
            </button>

            <button
              style={{
                backgroundColor: isSuccessfulUser
                  ? 'rgb(114, 187, 6)'
                  : 'lightgrey',
              }}
              type="register"
            >
              Registrera dig
            </button>
          </div>
        </form>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          {!hasEdited &&(
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Jag heter Ada och är din personliga assistent. Hur kan jag hjälpa
            dig?
          </Typography>)}
          {userId && !hasEdited && (
            <div>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ändra mina uppgifter
          </Typography>
          <form onSubmit={edit}>
            <div className="input-wrapper">
              <div>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Förnamn"
                />
              </div>
              <div>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Efternamn"
                />
              </div>
            </div>
            <button
              style={{
                backgroundColor: isSuccessfulEdit
                  ? 'rgb(114, 187, 6)'
                  : 'lightgrey',
              }}
              type="submit"
            >
              Spara
            </button>
          </form></div>)}
        </Box>
      </Modal>
    </div>
  );
}

import './App.css';

import React, { useState } from "react";
export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessages] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const formValid = firstName.length > 0 && lastName.length > 0;
    if (!formValid) {
      return;
    }
    setMessages(`Hello and welcome to Apendo, ${firstName} ${lastName} !`);
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label >Enter first name</label>
          <input className='input'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Enter last name</label>
          <input className='input'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      {message}
    </div>
  );
}
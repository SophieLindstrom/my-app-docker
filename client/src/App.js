import './App.css';

import React, { useState } from "react";
export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessages] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const formValid = firstName.length > 0 && lastName.length > 0;
    if (!formValid) {
      return;
    }
    

    const nameData = {firstName, lastName};
    const nameDataJson = JSON.stringify(nameData);

    const res = await fetch('http://localhost:4000/hello?firstName='+firstName+'&lastName='+lastName);

    const json = await res.json();

    setMessages(json.message);
  };

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
        <button type="submit">Submit</button>
      </form>
      {message}
    </div>
  );
}
import './App.css';

import React, { useState } from 'react';

function App(props) {
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
   <> Skriv ditt namn<input 
      type="text"
      value={value}
      onChange={handleChange}
    />

   
    <button>Submit</button>

     {value}
    </>
  );
}

export default App;
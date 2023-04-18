import React, { useState } from 'react';

const RecieveMessage = () => {
  const [message, setMessage] = useState(null);

  // Function to handle button click
  const handleButtonClick = () => {
    const url = 'http://localhost:4000/messages';
    const query = 'hello';

    fetch(`${url}?q=${query}`)
      .then(response => response.json())
      .then(data => {
        // Check if the API call was successful
        if (data.success) {
          const retrievedMessage = data.message;
          setMessage(retrievedMessage);
        } else {
          console.error(`API call failed with error: ${data.error}`);
        }
      })
      .catch(error => {
        console.error(`Failed to make API call: ${error}`);
      });
  };

  return (
    <div>
      {message ? (
        <p>Välkommen till Apendo: {message}</p>
      ) : (
        <p>No message retrieved yet.</p>
      )}
      <button onClick={handleButtonClick}>Retrieve Message</button>
    </div>
  );
};

export default RecieveMessage;

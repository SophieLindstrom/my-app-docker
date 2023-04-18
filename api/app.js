const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) =>{
  res.send('Hello from praktikanterna ts');
});

app.get('/hello', (req, res) =>{
  res.send('Hello hello lol');
});

app.get('/lol', (req, res) =>{
  res.send('Hello hello lollolo');
});
app.listen(port, () =>
  console.log(`Server ts running on port ${port}, http://localhost:${port}`)
);


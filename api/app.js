const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const port = process.env.PORT || 4000;

app.get('/', (req, res) =>{
  res.send('Hello from praktikanterna ts');
});

app.get('/hello', function(req, res){
  console.log(req.query);
  const firstName =  req.query.firstName;
  const lastName = req.query.lastName;
  res.setHeader('Content-Type', 'application/json');

  const greeting = `Hello ${firstName} ${lastName}!`;

  res.send(JSON.stringify({ message: greeting }));
});

app.get('/lol', (req, res) =>{
  res.send('Hello hello lollolo');
});
app.listen(port, () =>
  console.log(`Server ts running on port ${port}, http://localhost:${port}`)
);


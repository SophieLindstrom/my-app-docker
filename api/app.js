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
  res.send('Hello from praktikanterna');
});

app.get('/hello', function(req, res){
  console.log(req.query);
  const firstName =  req.query.firstName;
  const lastName = req.query.lastName;
  res.setHeader('Content-Type', 'application/json');

  // app.post('/hello', function(req, res){
  //   console.log(req.body);
  //   const firstName =  req.body.firstName;
  //   const lastName = req.body.lastName;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ message: `Hello ${firstName} ${lastName}!` }));
  // });

  const greeting = `Hello ${firstName} ${lastName} and welcome to Apendo!`;

  res.send(JSON.stringify({ message: greeting }));
});

app.listen(port, () =>
  console.log(`Server ts running on port ${port}, http://localhost:${port}`)
);


import express from "express";
// Create an express app
const app = express();
// Enable JSON 
app.use(express.json());
// Enabling static files
app.use(express.static('public'));


app.get('/factors/emison', (req, res) => {
  res.send('Hello World');
});

app.get('/calculate/total/:parameters', (req, res) => {
  res.send('hola');
})

app.get('data/historic/', (req, res) => {
  res.send('data historic');
});
 
// Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
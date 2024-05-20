import express from "express";


// Create an express app
const app = express();
// Enable JSON 
app.use(express.json());
// Enabling static files
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.send("Hello World");
});


// Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
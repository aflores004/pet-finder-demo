// # Get all pets
// GET /pets
// - Fetch all pets from the pets array
// - Return the list of all pets as JSON

// # Get pets by name
// GET /pets/:name
// - Extract the name parameter from the request
// - Filter the pets array to find pets with the specified name
// - Return the list of matching pets as JSON

// # Get pets by owner's name
// GET /pets/owner/:ownerName
// - Extract the ownerName parameter from the request
// - Filter the pets array to find pets owned by the specified owner
// - Return the list of pets owned by the specified owner as JSON


const express = require('express');
const bodyParser = require('body-parser');
const pets = require('./data'); // Import the pets array from data.js
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());




// Endpoint to get all pet names
app.get('/api/v1/pets', (req, res) => {
  const petNames = pets.map((pet) => pet.name);
  res.json(petNames);
});

app.get('/api/v1/pets/owner', (req, res) => {
  const ownerName = req.query.owner;

  if (!ownerName) {
    // If no owner name provided in the query, return a 400 status
    return res.status(400).json({ error: 'Owner name parameter is missing' });
  }

  const matchingPets = pets.filter((pet) => pet.owner === ownerName);

  if (matchingPets.length > 0) {
    res.json(matchingPets);
  } else {
    res.status(404).json({ error: 'No pets found for the specified owner' });
  }
});


// Endpoint to get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
  const petName = req.params.name;
  const matchingPet = pets.find((pet) => pet.name === petName);

  if (matchingPet) {
    res.json(matchingPet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline'");
  next();
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


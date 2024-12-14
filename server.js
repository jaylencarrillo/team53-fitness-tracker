const express = require('express');
const fetch = require('node-fetch'); // Ensure this is correctly imported
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3000; 

// Supabase credentials
const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d296eWF3dHdjYmptZnJ2dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzIzOTUsImV4cCI6MjA0OTU0ODM5NX0.4VcT03AbhrRvGmop2i2ZdHuhcSsnAMCL5hgXvIAPCxE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Nutritionix API credentials
const apId = '0e33c42a';
const apKey = '87ae8d8cc6004ba4a9333c050357fd61';

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main page
app.get('/searchFood', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page3-nutrition.html'));
});

// Endpoint to search for food
app.post('/searchFood', async (req, res) => {
    const foodItem = req.body.foodItem;
    if (!foodItem) {
        return res.status(400).send('Please provide a food item.');
    }

    try {
        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': apId,
                'x-app-key': apKey,
            },
            body: JSON.stringify({ query: foodItem }),
        });

        const data = await response.json();
        if (data.foods && data.foods.length) {
            res.json(data.foods);
        } else {
            res.status(404).send('No food items found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching food data.');
    }
});

// Route for generating workout exercises
app.post('/generateWorkouts', async (req, res) => {
    const selectedMuscles = req.body.selectedMuscles;
    if (!selectedMuscles || selectedMuscles.length === 0) {
        return res.status(400).send('Please select at least one muscle group.');
    }

    try {
        const response = await fetch(`https://wger.de/api/v2/exercise/?muscles=${selectedMuscles.join(',')}&language=2`, {
            headers: {
                'Authorization': 'Bearer 2ece34001acf803d853b48459bbb8c8194034207',
            },
        });

        const data = await response.json();
        if (data.results && data.results.length) {
            res.json(data.results);
        } else {
            res.status(404).send('No exercises found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching workout data.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.26.0/dist/supabase.min.js';


const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d296eWF3dHdjYmptZnJ2dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzIzOTUsImV4cCI6MjA0OTU0ODM5NX0.4VcT03AbhrRvGmop2i2ZdHuhcSsnAMCL5hgXvIAPCxE'
const supabase = createClient(supabaseUrl, supabaseKey)

//API ID and key
const apId = '0e33c42a';
const apKey = '87ae8d8cc6004ba4a9333c050357fd61';

//Adds a event listner to the search button
document.getElementById('searchButton').addEventListener('click',searchFood);

//Calorie Counter 
let totalCalories = 0;

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchFood);

// Save food to Supabase
async function saveFoodToDB(food) {
    const { data, error } = await supabase
        .from('nutrition')
        .insert([
            { 
                food_name: food.food_name, 
                calories: food.nf_calories 
            }
        ]);

    if (error) {
        console.error('Error saving food:', error);
    } else {
        console.log('Food saved to database:', data);
    }
}

// Search for food using Nutritionix API
function searchFood() {
    const foodItem = document.getElementById('food-name').value.trim();

    if (!foodItem) {
        alert('Please enter a food item.');
        return;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': apId,
            'x-app-key': apKey,
        },
        body: JSON.stringify({ query: foodItem }),
    })
    .then(response => response.json())
    .then(data => {
        resultsDiv.innerHTML = ''; // Clear loading text
        displayResults(data.foods);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p>Error fetching data. Please try again.</p>';
    });
}

// Display search results and add "Add to Meal" functionality
function displayResults(foods) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    foods.forEach(async (food) => {
        await saveFoodToDB(food);

        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');
        foodDiv.innerHTML = `
            <p><strong>${food.food_name}</strong>: ${food.nf_calories} calories</p>
        `;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Meal';
        addButton.addEventListener('click', () => addCalories(food.nf_calories));

        foodDiv.appendChild(addButton);
        resultsDiv.appendChild(foodDiv);
    });
}

// Add calories to the total
function addCalories(calories) {
    totalCalories += calories;
    document.getElementById('total-calories').textContent = `${totalCalories} kcal`;
}

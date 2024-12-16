// Ensure the Supabase library is available globally
const { createClient } = window.supabase;

// API ID and key
const apId = '0e33c42a';
const apKey = '87ae8d8cc6004ba4a9333c050357fd61';

// Supabase credentials
const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d296eWF3dHdjYmptZnJ2dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzIzOTUsImV4cCI6MjA0OTU0ODM5NX0.4VcT03AbhrRvGmop2i2ZdHuhcSsnAMCL5hgXvIAPCxE';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', searchFood);
});

// Calorie Counter 
let totalCalories = 0;

// Save food to Supabase
async function saveFoodToDB(food) {
    console.log('Saving food to DB:', food); 
    const { data, error } = await supabase
        .from('Nutrition')
        .insert([
            { 
                food_name: food.food_name
            }
        ]);

    if (error) {
        console.error('Error saving food:', error.message, error.details);
    } else {
        console.log('Food saved:', data);
    }
}

// Function to search for food
async function searchFood() {
    const foodItem = document.getElementById('food-name').value;
    if (!foodItem) {
        alert('Please provide a food item.');
        return;
    }

    const host = window.location.origin; 

    try {
        const response = await fetch(`${host}/searchFood`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodItem }),
        });

        const data = await response.json();
        if (response.ok) {
            data.forEach(food => {
                totalCalories += food.nf_calories;
                saveFoodToDB(food);
            });
            document.getElementById('total-calories').textContent = totalCalories;
        } else {
            alert('No food items found.');
        }
    } catch (error) {
        console.error('Error fetching food data:', error);
        alert('Error fetching food data.');
    }
}

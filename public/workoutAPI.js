// Ensure the Supabase library is available globally
const { createClient } = window.supabase;

// Supabase credentials
const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d296eWF3dHdjYmptZnJ2dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzIzOTUsImV4cCI6MjA0OTU0ODM5NX0.4VcT03AbhrRvGmop2i2ZdHuhcSsnAMCL5hgXvIAPCxE';
const supabase = createClient(supabaseUrl, supabaseKey);

// Adds an event listener to the generate button
document.getElementById('generateButton').addEventListener('click', generateWorkouts);

// Function to save workout to Supabase
async function saveWorkoutToDB(workout) {
    console.log('Saving workout to DB:', workout); // Add this line to inspect the workout object
    const { data, error } = await supabase
        .from('Exercise') // Ensure the correct table name
        .insert([
            { 
                exercise_name: workout.name, 
                exercise_description: workout.description,
                muscle_group: workout.muscle_group
            }
        ]);

    if (error) {
        console.error('Error saving workout:', error.message, error.details);
    } else {
        console.log('Workout saved:', data);
    }
}

// Function to fetch muscle groups and create checkboxes
async function fetchMuscleGroups() {
    try {
        const response = await fetch('https://wger.de/api/v2/muscle/');
        const data = await response.json();
        const muscleGroupContainer = document.getElementById('muscle-group-container');

        data.results.forEach(muscle => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'muscle';
            checkbox.value = muscle.id;
            checkbox.id = `muscle-${muscle.id}`;

            const label = document.createElement('label');
            label.htmlFor = `muscle-${muscle.id}`;
            label.textContent = muscle.name;

            muscleGroupContainer.appendChild(checkbox);
            muscleGroupContainer.appendChild(label);
            muscleGroupContainer.appendChild(document.createElement('br'));
        });
    } catch (error) {
        console.error('Error fetching muscle groups:', error);
    }
}

// Function to generate workouts
async function generateWorkouts() {
    const selectedMuscles = Array.from(document.querySelectorAll('input[name="muscle"]:checked')).map(input => input.value);
    if (selectedMuscles.length === 0) {
        alert('Please select at least one muscle group.');
        return;
    }

    const host = window.location.origin; // Use window.location.origin to get the base URL

    try {
        const response = await fetch(`${host}/generateWorkouts`, { // Use dynamic base URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedMuscles }),
        });

        const data = await response.json();
        if (response.ok) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results

            data.forEach(workout => {
                console.log('Workout:', workout); // Add this line to inspect the workout object
                saveWorkoutToDB({
                    name: workout.name,
                    description: workout.description,
                    muscle_group: selectedMuscles.join(', ')
                });

                // Create workout element
                const workoutElement = document.createElement('div');
                workoutElement.className = 'workout';

                const workoutName = document.createElement('h3');
                workoutName.textContent = workout.name;

                const workoutDescription = document.createElement('p');
                workoutDescription.innerHTML = workout.description;

                workoutElement.appendChild(workoutName);
                workoutElement.appendChild(workoutDescription);

                resultsContainer.appendChild(workoutElement);
            });
            alert('Workouts generated and saved.');
        } else {
            alert(data.error || 'No workouts found.');
        }
    } catch (error) {
        console.error('Error fetching workout data:', error);
        alert('Error fetching workout data.');
    }
}

// Fetch muscle groups when the page loads
document.addEventListener('DOMContentLoaded', fetchMuscleGroups);

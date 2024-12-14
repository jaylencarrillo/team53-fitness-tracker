// Ensure the Supabase library is available globally
const { createClient } = window.supabase;

// Supabase credentials
const supabaseUrl = 'https://fvwozyawtwcbjmfrvtud.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2d296eWF3dHdjYmptZnJ2dHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NzIzOTUsImV4cCI6MjA0OTU0ODM5NX0.4VcT03AbhrRvGmop2i2ZdHuhcSsnAMCL5hgXvIAPCxE';
const supabase = createClient(supabaseUrl, supabaseKey);

// This waits for the page to load then it runs the function 
document.addEventListener('DOMContentLoaded', function() {
    // Once it loads, it adds an event listener to the generateWorkout button
    document.getElementById('generateWorkoutButton').addEventListener('click', generateWorkouts);
});

async function saveExerciseToDB(exercise) {
    const { data, error } = await supabase
        .from('Exercise')
        .insert([
            { 
                exercise_name: exercise.name, 
                description: exercise.description || 'No description available.',
                muscle_group: exercise.muscle_group || 'Not specified'
            }
        ]);

    if (error) {
        console.error('Error saving exercise:', error);
    } else {
        console.log('Exercise saved:', data);
    }
}

// This defines the function generateWorkouts which fetches exercises based on selected workout
function generateWorkouts() {
    // Creates an empty array called selectedMuscles
    let selectedMuscles = [];

    // Checks chosen muscle groups
    document.querySelectorAll('input[name="muscle-group"]:checked').forEach(function(checkbox) {
        // Pushes the muscle group into the array
        selectedMuscles.push(checkbox.value);
    });

    // Checks if the selected muscles array is empty and sends a message
    if (selectedMuscles.length === 0) {
        alert('Choose a muscle group');
        return;
    }

    // Gets HTML element with the ID
    const workoutDiv = document.getElementById('workout');
    workoutDiv.style.display = 'block';
    workoutDiv.innerHTML = '<p>Loading exercises ....</p>';

    // Makes the API call
    fetch(`https://wger.de/api/v2/exercise/?muscles=${selectedMuscles.join(',')}&language=2`, {
        headers: {
            'Authorization': '2ece34001acf803d853b48459bbb8c8194034207'
        }
    })
    // Processes the API response and turns it into a JSON object
    .then(response => response.json())
    .then(data => {
        workoutDiv.innerHTML = '';

        if (data.results.length) {
            data.results.forEach(async exercise => {
                await saveExerciseToDB(exercise);
                let exerciseDiv = document.createElement('div');
                exerciseDiv.classList.add('exercise-item');
                exerciseDiv.innerHTML = `
                    <h3>${exercise.name}</h3>
                    <p>${exercise.description || 'No description available.'}</p>
                `;
                workoutDiv.appendChild(exerciseDiv);
            });
        } else {
            workoutDiv.innerHTML = '<p>No exercises match your criteria.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching workouts:', error);
        workoutDiv.innerHTML = '<p>Error fetching workouts. Please try again later.</p>';
    });
}

// This waits for the page to load then it runs the function 
document.addEventListener('DOMContentLoaded', function() {

    // Once it loads, it adds an event listener to the generateWorkout button
    document.querySelector('button').addEventListener('click', generateWorkouts);
});

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
        // Clears the previous content
        workoutDiv.innerHTML = '';

        // Loops through the exercises and displays them
        if (data.results.length === 0) {
            workoutDiv.innerHTML = '<p>No exercises match your criteria.</p>';
        } else {
            data.results.forEach(function(exercise) {
                let exerciseDiv = document.createElement('div');
                exerciseDiv.classList.add('exercise-item');
                exerciseDiv.innerHTML = `
                    <h3>${exercise.name}</h3>
                    <p>${exercise.description || 'No description available.'}</p>
                `;
                workoutDiv.appendChild(exerciseDiv);
            });
        }
    })
    // Runs if there is an error
    .catch(function(error) {
        console.error('Error:', error);
        workoutDiv.innerHTML = '<p>Error fetching workouts. Please try again later.</p>';
    });
}
function displayExercise(workoutDiv, exercise) {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise-item');

    // Build the exercise details
    exerciseDiv.innerHTML = `
        <h3>${exercise.name}</h3>
        <p>${exercise.description || 'No description available.'}</p>
        <button onclick="startExercise('${exercise.name}')">Start Exercise</button>
    `;

    workoutDiv.appendChild(exerciseDiv);
}
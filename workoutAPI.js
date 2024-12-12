//This waits for the page to load then it run the function 
document.addEventListener('DOMContentLoaded',function() {

    //Once it loads it adds a event listner to the generateWorkout button
    document.querySelector('button').addEventListener('click', generateWorkouts);
});

//This defines the function generateWorkouts which fetches exercises based on selectes workout
function generateWorkouts(){

    // Creates empty arry called selected Muscles
    let selectedMuscles = [];

    //Checks choosen muscles groups
    document.querySelectorAll('input[name="muscle-group"]:checked').forEach(function(checkbox){
        
        //pushes the muscle group into the arry
        selectedMuscles.push(checkbox.value);
    });

    //Stores the selected workout intensity level
    let intensity = document.getElementById('intensity').value;

    //Checks if the select is empty and sends a message
    if (selectedMuscles.length === 0){
        alert('Choose a muscle group');
        return;
    }
    
    //Gets HTML element with the IDs
    const workoutDiv = document.getElementById('workout');
    workoutDiv.style.display = 'block';
    workoutDiv.innerHTML = '<p> Loading exercies ....</p>';

    //Makes the API call 
    fetch(`https://wger.de/api/v2/exercise/?muscles=${selectedMuscles.join(',')}&language=2`, {
        headers:{
            'Authorization': '2ece34001acf803d853b48459bbb8c8194034207'
        }
    })

    //Processes the API response and turns it to a JSON 
    .then(response => response.json())

    //Excutes with Data
    .then(data => {

        //Clears
        workoutDiv.innerHTML = '';

        //Filters the list
        let filteredExercises = data.results.filter(function(exercise){

            //Checks the intensity 
            if (intensity === 'intensity'){
                return exercise.description.includes('intensive');
            }else{
                return !exercise.description.includes('intensive');
            }
    });

    //Checks if the arry is empty and if it is returns message
    if(filteredExercises.length === 0) {
        workoutDiv.innerHTML = '<p> No Exercises Match Criteria</p>';
    }else{

        //If there is matching exercies it creates a new div adds the 
        //exercies and description then it displays it
        filteredExercises.forEach(function(exercise){
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

//Runs if there is a error
.catch(function(error) {
    console.error('Error',error);
});
}
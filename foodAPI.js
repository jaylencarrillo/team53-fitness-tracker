//API ID and key
const apId = '0e33c42a';
const apKey = '87ae8d8cc6004ba4a9333c050357fd61';

//Adds a event listner to the search button
document.getElementById('searchButton').addEventListener('click',searchFood);

//Calorie Counter 
let totalCalories = 0;

//Gets the value for the food
function searchFood(){
    const foodItem = document.getElementById('food-name').value;

    //Post request to the Nutritionix API
    fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': apId,
            'x-app-key': apKey,
        },

        //sends food query as a JSON object to API
        body: JSON.stringify({ query: foodItem}),
    })

    //Processes the API response and turns it to a JSON 
    .then(response => response.json())

    //Excutes with Data
    .then(data =>{

        //Function is rendered on to the page
        displayResults(data.foods);
    })

    //Logs error
    .catch(console.error('Error',error));
}

//retrieves the div and is displayed
function displayResults(foods){
    const resultsDiv = document.getElementById('results');

    //clears 
    resultsDiv.innerHTML = '';

    foods.forEach(food => {

        //Create new div
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('food-item');

        //Sets the inner html content and adds food name and calories  
        foodDiv.innerHTML = ` 
        <p>
        <strong>${food.food_name}</strong>: ${food.nf_calories} calories
        </p>
        <button onclick="addCalories(${food.nf_calories})">Add to Meal</button>
        `;

        //Appends the food div to results and makes it visible
        resultsDiv.appendChild(foodDiv);
    });

}

//Adds the calories of each food and updates it
function addCalories(calories){

    //add the calories
    totalCalories += calories;

    //Updates the calories  everytime a new food is searched
    document.getElementById('total-calories').textContent = totalCalories;
}
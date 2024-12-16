# Fitness Buddy

## Description
Fitness Buddy is a fitness tracker that helps users manage their fitness journey. It provides exercise recommendations based on muscle groups and offers:

- **Exercise Guide**: Personalized workout routines for specific muscle groups.
- **Progress Tracking**: A calendar to track progress and stay consistent.
- **Nutrition Guidance**: Tips and plans for healthier eating.
- **Workout Videos**: Videos to improve your exercise routines.

Perfect for beginners or experienced athletes, Fitness Buddy supports your fitness goals.

## Target Platforms and Browsers
Fitness Buddy works on:

- **iOS Browsers**: Safari, Chrome, Firefox
- **Android Browsers**: Chrome, Firefox
- **Desktop Browsers**: Chrome, Firefox, Safari

# Fitness Buddy App Developer Manual

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application Locally](#running-the-application-locally)
5. [Running Tests](#running-tests)
6. [API Documentation](#api-documentation)
7. [Known Bugs](#known-bugs)
8. [Future Development Roadmap](#future-development-roadmap)
9. [Troubleshooting](#troubleshooting)

---

## Introduction

This document provides detailed instructions for setting up, running, and developing the Fitness Tracker App. It also includes the API documentation, known issues, and a roadmap for future development. This guide assumes the developer has knowledge of web applications and the relevant technical stack but does not have prior knowledge of this specific project.

## Setup and Installation

### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v14+)
- **npm** (v6+)
- **Vercel CLI**

### Steps

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```sh
   git clone <repository-url>
   cd team53-fitness-tracker
   ```

2. **Install Dependencies**  
   Install the necessary dependencies with npm:
   ```sh
   npm install
   ```

3. **Install Vercel CLI**  
   If you don't have the Vercel CLI installed, run the following:
   ```sh
   sudo npm install -g vercel
   ```

4. **Supabase Credentials**  
   Make sure to configure the `.env` file with Supabase credentials for database access, or ensure the server has appropriate access rights to Supabase.

---

## Running the Application Locally

1. **Start the Server**  
   Run the server with the following command:
   ```sh
   node server.js
   ```

2. **Access the Application**  
   After the server starts, navigate to `http://localhost:3000` in your web browser.

---

## Running Tests

1. **Add Testing Framework**  
   If testing is already set up using a framework like Jest, Mocha, or Supertest, use the following command to install necessary packages if you haven't yet:
   ```sh
   npm install --save-dev jest supertest
   ```

2. **Running Tests**  
   To run the tests, use the npm test script defined in `package.json`:
   ```sh
   npm test
   ```

3. **Test Scripts**  
   Ensure that the tests are organized and placed in the `__tests__` directory or a similar test folder according to your testing structure.

---

## API Documentation

### Endpoints Overview

The following API endpoints are provided by the server:

### 1. **GET /api/food**

- **Description**: Retrieves a list of food items from the database.
- **Request Example**:
  ```http
  GET /api/food
  ```
- **Response**: Returns an array of food items:
  ```json
  [
    {
      "id": 1,
      "name": "Apple",
      "calories": 95,
      "protein": 0.5
    },
    {
      "id": 2,
      "name": "Banana",
      "calories": 105,
      "protein": 1.3
    }
  ]
  ```

### 2. **POST /api/food**

- **Description**: Adds a new food item to the database.
- **Request Example**:
  ```http
  POST /api/food
  Content-Type: application/json
  {
    "name": "Orange",
    "calories": 62,
    "protein": 1.2
  }
  ```
- **Response**: Confirms food item was added:
  ```json
  {
    "message": "Food item added successfully"
  }
  ```

### 3. **GET /api/workouts**

- **Description**: Retrieves a list of workouts or a specific workout by muscle group.
- **Request Example**:
  ```http
  GET /api/workouts?group=legs
  ```
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Squat",
      "reps": 12,
      "sets": 3
    }
  ]
  ```

### 4. **PATCH /api/workout/:id**

- **Description**: Updates a specific workout's details.
- **Request Example**:
  ```http
  PATCH /api/workout/1
  Content-Type: application/json
  {
    "reps": 15
  }
  ```
- **Response**: Confirms update:
  ```json
  {
    "message": "Workout updated successfully"
  }
  ```

---

## Known Bugs

1. **API Call Delays**  
   Some API requests may experience delays. This is due to network latency when fetching workout and nutrition data from external APIs.

---

## Future Development Roadmap

1. **Integration of More APIs**  
   - Add an API to integrate personalized fitness plans.
   - Implement support for logging additional nutrients (fiber, sugars, etc.).

2. **User Authentication**  
   - Implement user authentication and authorization for personalized workout and nutrition tracking.

3. **Progress Tracker Improvements**  
   - Add more visualization features to the progress tracker (charts, graphs).
   
4. **Mobile Support**  
   - Make the user interface responsive for better mobile support.

5. **Testing**  
   - Implement full test coverage for both client and server code, ensuring the stability of API endpoints.

---

## Troubleshooting

### Common Issues

1. **Server Not Starting**  
   - Ensure that Node.js and npm are installed and up-to-date.
   - Verify that all required environment variables (e.g., Supabase credentials) are set.

2. **API Errors**  
   - Confirm the server is running before making any API requests.
   - Use browser developer tools or Postman to test API requests.
   - Ensure API keys for external services (e.g., Nutritionix) are configured properly.

### Debugging Tips

- **Console Logs**: Use `console.log()` in both client-side and server-side code for debugging.
- **Network Tab**: Check browser dev tools for API request errors or network issues.
- **Error Messages**: Review any error messages in the terminal or browser console for useful debugging hints.
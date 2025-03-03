# Grammar Correction App

This project is a simple grammar correction app that allows users to log in, log out, and check text for grammatical errors. Built using a JavaScript stack, this app demonstrates minimalistic design and functionality.

## Tech Stack

- **Frontend**: Vue 3, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT, bcrypt
- **API**: OpenAI's API for grammar checking

## Features

### Login & Logout Pages
- Users can log in using a username and password.
- Users can log out without errors.

### Grammar Check Page
- A simple text input (multiline) for users to enter text.
- A live preview of the entered text is displayed above the input.
- Utilizes OpenAI’s API to check for grammatical errors.
- Incorrect or misspelled words are highlighted, similar to Grammarly.



## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grammar-correction-app
   ```

2. Install dependencies for both client and server:
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Set up your MongoDB connection string in the `.env` file.

4. Run the application:
   ```bash
   npm start
   ```

## Deployment

Deploy the application to a free hosting service (e.g., Heroku, Vercel) and share the link here.

## License

This project is licensed under the MIT License.
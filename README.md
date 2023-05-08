# NISF Event Management Application

This is an event management application for the NI Science Festival to allow the submission, editing and approval of events by staff and partner organisations. 

## Required Software
Node.js\
npm
IDE (VSCode)

## Servers
Front End Port: http://localhost:3000/
Back End Port: http://localhost:5000/

## Local Setup
- Download Git
- Type npm -v to verify npm installation 
- Clone from git repository 
- Open VSCode and open the cloned repository
- In root directory in terminal type `npm run setup-production` 


## File Structure

nisf-event-app - Client application
* public - Holds the static files
* src
  * assets - Holds CSS Wrappers, images and fonts
  * components - Holds all the React components 
  * context - Holds the Context API, Reducer and Actions for managing state
  * pages - conatins the main page components
  * utils - Holds utility functions
  * index.css - Root CSS for the application
  * App.js - Renders broswer routes
  * indes.js - Renders entire application
* package.json - Contains descriptive and functional metadata about a project

Server
* controllers - Hp;ds the functions to process route requests
* customErrors -  Customised errors to provide a more detailed response
* db - Holds MongoDB connect method
* middleware - Holds funcxtions that execute during the processing of HTTP requests
* models - Holds MongoDB data models
* routes - Holds routes that associate a HTTP request with the relevant function
* test - Holds test files
* utils - Holds utility functions
* views - Holds email templates
* excelToJason.js - Hold fucntion to convert a CSV file to JSON objects
* package.json - npm configuration file
* populate.js - Function the populate the database with events if JSON objects
* populateUsers.js - Function the populate the database with users if JSON objects
* server.js - Defines npm behaviours and loads middleware.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
Produces mochawsome report


### `npm run setup-production`

Builds the app for production to the `build` folder.\
It installs all dependencies and libraries in the root and nisf-event-app client



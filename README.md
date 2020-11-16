# Blugame

Blugame is a guess game between two players, a user starts the game, selects his/her opponent and sets a word to be guessed by the opponent, the opponent guesses and the users replys a YES or a NO. The opponent has 20 guesses for the game, the game ends when the opponent gueses the right word before a 20th guess or when the user runs of guess and loses

*Author:* Ibiyemi Pedro


## Requirements
- NodeJS - version 14.03 or later

## Technologies and Framework
- NodeJS with Express Framework - For server and backend services
- VueJS - For frontend services
- WebSocket - For realtime communications

## Backend Installation
*Folder:* {baseFolder}/blugame_backend
### 

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure
The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:
- CONFIG - contains config data Eg DB config and other config 
- CONTROLLER - contains the files that receives data from the routes and call the services 
- ROUTES - contains files that handles the request routes and forward to appropriate controller
- SERVICES - contains services files that handles requests functionalities 
- TEST - contains test files 
- UTILS - containing classes, middlewares and other utility functions 

## Set - Up

### Download Project

Clone the source file from the GitHub repo [https://github.com/yemipedro07/blugame.](https://github.com/yemipedro07/blugame).



### Install Dependencies

To install the dependencies of the project 

Navigate to the root folder of the backend - {baseFolder}/blugame_backend, open a terminal and run the following command

```bash
npm install

```


### Serve the project

At this point, everything should be set and project ready to run. 

Run the following command

```bash
npm run start
```
If everything runs fine, navigate to your browser and open http://localhost:3250. The project will be running on the endpoint.

## EndPoints

### Register a User -

*Endpoint*  ` http://localhost:3250/auth` - method (POST)

- Creates a user

*Payload*

#### application/json

```bash
{
	"username" : "DemoUser",
	"password" : "12345678",
	"flag" : "register"
}
```


*Response format*

```bash
{
    "status": true,
    "data": null,
    "message": "Registration successful"
}
```


### User Login -

*Endpoint*  ` http://localhost:3250/auth` - method (POST)

- Login to play game

*Payload*

#### application/json

```bash
{
	"username" : "DemoUser",
	"password" : "12345678"
}
```


*Response format*

```bash
{
    "status": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW9Vc2VyIiwiaWF0IjoxNjA1NTEyMTI4LCJleHAiOjE2MDU1OTg1Mjh9.1NYvGLy0EWDc0B_Y4PigeDiN9C-aCifFc78suVzmNHs",
        "user": {
            "gameID": "IDVSs7nqP",
            "_id": "5fb22b990c189808a067ef4e",
            "username": "DemoUser",
            "password": "$2b$12$JBxG6pYO6tizO.eq9oyI3.aV0MbKs5ur2nW0TZqkylh1yuUP9H4nG",
            "__v": 0
        }
    },
    "message": "Login successful"
}
```


### Get Users Online -

*Endpoint*  ` http://localhost:3250/game/usersonline` - method (POST)

- Get users online - and subscribe to the socket to update users online

*header*


```bash
{
	"Content-Type" : "application/json",
	"Authorization" : "Bearer **token**"
}
```

*Payload*

#### application/json

```bash
{
	"username" : "DemoUser"
}
```

*Response format*


```
{
    "status": true,
    "data": [
        "DemoUser"
    ],
    "message": ""
}

```

### Play User -

*Endpoint*  ` http://localhost:3250/game/playuser` - method (POST)

- Start a game with a user

*header*


```bash
{
	"Content-Type" : "application/json",
	"Authorization" : "Bearer **token**"
}
```

*Payload*

#### application/json

```bash
{
    "username": "DemoUser",
    "opponent": "DonPedro",
    "question": "Black"
}
```

*Response Format*

```bash
{
    "status": true,
    "data": "DonPedro",
    "message": "Game started ..."
}
```
### InGame Play -

*Endpoint*  ` http://localhost:3250//game/gameplay` - method (POST)

- Sends a message to a user and checks the answer with the question

*header*


```bash
{
	"Content-Type" : "application/json",
	"Authorization" : "Bearer **token**"
}
```

*Payload*

#### application/json

```bash
{
    "gameID": "DemoUser",
    "username": "DemoUser",
    "opponent": "DonPedro",
    "reply": "Black"
}
```

*Response Format*

```bash
{
    "status": true,
    "data": null,
}

```

### Disconnect User -

*Endpoint*  ` http://localhost:3250/game/disconnectuserr` - method (POST)

- Disconnects a user from the game socket and removes the game details from memory, then logs the user out

*header*


```bash
{
	"Content-Type" : "application/json",
	"Authorization" : "Bearer **token**"
}
```

*Payload*

#### application/json

```bash
{
    "username": "DemoUser"
}
```

*Response Format*

```bash
{
    "status": true,
    "data": [
        "DonPedro"
    ],
}

```
### Backend Test
Test files are located in the test folder and to run the test, run the command below in the root folder of the backend
```bash
npm run test
```



## Backend Docker Installation
To run the dockerized version of the backend, ensure you have docker installed  visit [https://docs.docker.com/](https://docs.docker.com/get-docker/) to install. Navigate to the backend base folder and run the following commands below The docker file is located in the base folder. To create the image in the current directory, run

```bash
docker build -t blugame_backend:1.0 .
```

After creating the image, to run the image on the default port of the app

```bash
docker run -p 3250:3205 blugame_backend:1.0 
```

## FrontEnd Installation
*Folder:* {baseFolder}/blugame_frontend
### 

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

You will also need the vue-cli, to install globally run the following command in a terminal. 

```bash
npm install -g @vue/cli
```

Once installed, to confirm vue is installed and see the current version

```bash
vue --version
```

## Project Structure
The code base is structured in a modular way, following a View - Controller <--> Service Architecture. An overview of the code base in the {baseFolder}/blugame_frontend/src folder:
- ASSETS - containing project assets - images css files
- COMPONENTS - contains the reusable components across the app
- CONFIG - contains app general configurations
- PLUGINS - containing the plugins used in the app Eg. Vuetify frontend design plugin
- ROUTER - containing the routes definition 
- SERVICES - contains the services that connect with the backend. 
- STORE - contains state management files 
- VIEWS - contains the views for each route 

## Set - Up

### Download Project

Clone the source file from the GitHub repo [https://github.com/yemipedro07/blugame.](https://github.com/yemipedro07/blugame).



### Install Dependencies

To install the dependencies of the project 

Navigate to the root folder of the frontend - {baseFolder}/blugame_frontend, open a terminal and run the following command

```bash
npm install

```

### Serve the project

At this point, everything should be set and project ready to run. 

Run the following command

```bash
npm run serve
```
If everything runs fine, navigate to your browser and open http://localhost:8000. The project will be running on the endpoint.

## Frontend Docker Installation
To run the dockerized version of the frontend, ensure you have docker installed  visit [https://docs.docker.com/](https://docs.docker.com/get-docker/) to install. Navigate to the frontend base folder and run the following commands below The docker file is located in the base folder. To create the image in the current directory, run

```bash
docker build -t blugame_frontend:1.0 .
```

After creating the image, to run the image on the default port of the app

```bash
docker run -p 8080:8080 blugame_backend:1.0 
```

## Contributions

For contributions and improvement of the game, some areas of focus would be

### Test
The game is an ongoing project, and not all tests have not been written yet both for the frontend and backend. A framework used is jest as it is both recommended by both express and vue

### Game Process
The gaming process can still be worked on for a better playing experience, some idea would be adding a timing process to monitor users inactivity and other ideas that come to mind.

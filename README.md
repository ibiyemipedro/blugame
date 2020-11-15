# Guessing Game Backend

Blugame is a guess game between two players, a user starts the game, selects his/her opponent and sets a word to be guessed by the opponent, the opponent guesses and the users replys a YES or a NO. The opponent has 20 guesses for the game, the game ends when the opponent gueses the right word before a 20th guess or when the user runs of guess and loses

*Author:* Ibiyemi Sanni


## Requirements
- NodeJS - version 14.03 or later

## Installation
### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```


## Project Structure
The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:
- CONFIG - containing config data and files 
- CONTROLLER - contains the files that receives data from the routes and call the services 
- ROUTES - containing files that handles the request routes and forward to appropriate controller
- SERVICES - containing services files that handles requests functionalities 
- TESTS - containing test files 
- UTILS - containing classes, middlewares and other utility functions 

## Set - Up

### Download Project

Clone the source file from github the github repo [https://github.com/yemipedro07/luckyGame.](https://github.com/yemipedro07/luckyGame) or unzip the source file to your project folder



### Install Dependencies

To install the dependencies of the project 

Navigate to the root folder of the project, open a terminal and run the following command

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

*Endpoint*  ` http://localhost:3800/auth` - method (POST)

- Creates a user

*Payload*

#### application/json

```bash
{
	"username" : "DemoUser",
	"password" : "12345678",
	"flag" : "register",
}
```


*Response format*

```bash
{
    "status": true,
    "message": "User registration successful",
    "data": null
}
```


### User Login -

*Endpoint*  ` http://localhost:3800/auth` - method (POST)

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
    "message": "User login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE2MDM1NjcyMDcsImV4cCI6MTYwMzY1MzYwN30.b4KOKwXFNm57CdhY4gcSkxxElhjmaRhVfaIol-KcNl8",
        "user": {
            "id": 1,
            "name": "Demo User",
            "email": "a@a.com",
            "password": "$2b$12$fccxgHrB3Ux1pxW9KzmDQ.Q9JLYkJ8QiKz3ys81PjMQ1Uf5zeHZFC",
            "age": 17,
            "createdAt": "2020-10-23T18:36:16.509Z",
            "updatedAt": "2020-10-23T18:36:16.509Z"
        }
    }
}
```


### Play User -

*Endpoint*  ` http://localhost:3800/game/playuser` - method (POST)

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
	"username" : "DemoUser",
	"password" : "12345678"
}
```

### InGame Play -

*Endpoint*  ` http://localhost:3800/game/gameplay` - method (POST)

- Send messages and reply in game

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
	"username" : "DemoUser",
	"password" : "12345678"
}
```


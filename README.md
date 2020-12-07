![Quarantine & Chill Logo](./client/public/quarantine-chill.png)

# Quarantine & Chill

Quarantine & Chill is a single-page React web app designed to address elements of decision fatigue that accompany shelter-in-place. With the widespread closure of businesses during COVID-19, many people have lost access to their favorite recreations and pastimes and are stuck in their own homes. The days blend together as we cook every meal at home and binge-watch television. With Quarantine and Chill, you no longer have to eternally scroll through dinner recipes and movie options, waiting for something interesting to jump out. Let Quarantine and Chill make that decision for you! [Check it out live here on Heroku](https://quarantine-chill.herokuapp.com/)

## About

### Features

* `react` and `react-router` are set-up in `create-react-app` layout

* Connected to two different APIs to generate unique movie and recipe pairings based on your preferences: [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction) and [Spoontacular](https://spoonacular.com/food-api/docs#Search-Recipes)

* MongoDB/Express/Node.js - powered backend

* Spinners from the [react-spinners npm package](https://www.npmjs.com/package/react-spinners)

* Bash `run.sh` script that brings in a `.env.local` file for configuration

## Usage

### Set-up

1. Do one of the following:
    - Download this repo as zip file,then extract
    - Git pull and copy over the files into your project 
    - Fork this project

2. Set-up a MongoDB database: Either set-up a [MongoDB Atlas](https://cloud.mongodb.com) database, or install and configure a local DB for testing.

3. Create a ".env.local" file, that contains your credentials. 

    - If you will be using the supplied run.sh, it should be in the following
      format:

        export MONGODB_URI='mongodb://USERNAME:PASSWORD@something.com:1234/DB_NAME'

    - Where USERNAME and PASSWORD is replaced with an actual username and
      password on the MongoDB. In the case of MongoDB Atlas, you will have to
      create a username and password as a separate step.

4. NPM install (this will install for both backend and frontend, and may take a
while):

    `npm install`


### Running

You have two options for running local development, either manually starting
the server using two terminals, or using the included `run.sh` which does that
for you in a single terminal.

#### Two terminals

Open up two terminals, one for the backend, the other for the front-end. The
backend server will run using Node Monitor ("nodemon") which will auto-restart
when you make changes.

**Backend terminal:**

    source .env.local
    ./node_modules/.bin/nodemon server.js

**Frontend terminal:**

    cd client
    npm run start

#### One terminal: `run.sh`

For local development, use the included "run.sh" Bash script:

    bash run.sh

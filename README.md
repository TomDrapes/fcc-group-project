# fcc-group-project

## Getting started

### Clone the repo

If you've added your ssh keys to github you can use the ssh url, otherwise just copy the https url and run:

`git clone https://github.com/TomDrapes/fcc-group-project.git`

### Install npm packages

Run the following command in both the `fcc-group-project` (node server) and the `fcc` (client app) directories where the `package.json` files are located. You only need to run this when new packages have been added to the code that you haven't installed locally yet.

`npm install`

### Database keys for MongoDB Atlas

To get started, a Mongo URL is required to access the cloud database. These must be manually requested from in a the slack channel.
Otherwise, you also have the option for downloading MondoDB locally on your computer.

#### Downloading MongoDB locally

TO DO

### Start the frontend

Inside the `fcc` directory run:

`npm start`

This will start the app in your browser on localhost.

### Libraries for reference

#### FronEnd

- Material UI: https://material-ui.com/getting-started/installation/
- React router: https://reactrouter.com/web/api/Switch
- React: https://reactjs.org/docs/hooks-intro.html

#### Backend

- express - web framework: https://www.npmjs.com/package/express
- MongoDB - NOSQL Database: https://docs.mongodb.com/
- Mongoose - Schema for MongoDB: https://mongoosejs.com/docs/documents.html
- nodemon - https://www.npmjs.com/package/nodemon

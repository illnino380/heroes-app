# Heroes List

<img src="public\git2.gif" width="100%"/>

### Description

  A catalog of Superheroes with pagination.
The user can view superhero cards, add new superheroes, edit the selected card and delete a card or photo from the catalog. Each card has a detailed post with the possibility of editing and deleting information.
  
  The client and server parts of the application are implemented on the MERN-stack.

  The backend part is built on RestAPI principles with all CRUD operations of user interaction with the database and error catching. Line length verification is performed using the Express-Validator.
  The frontend part uses React with hooks and TypeScript.The storage is implemented through a Redux toolkit with async thunks. Client requests to the server are made using the Axios library. The design is built by CSS-framework MaterialUI

### Technologies used:

frontend:
- React with Typescript   
- State managment library: Redux(Redux Toolkit)
- CSS library: Material UI
- Client requests: Axios

Backend:
- Express.js
- MongoDB
- Express-validator

### Instructions how to run application locally:
1. Use 14 version of node.js:
```bash 
nvm use 14
```
2. Clone the repository to your local machine, open terminal and clone repo with command bellow:
```bash 
git clone https://github.com/illnino380/heroes-app.git
```
3. Open project in terminal:
```bash 
cd heroes-app
```
4. Set up project and install necessary packages:
```bash 
npm install
```
5. Add command to terminal:
```bash 
npm run dev
```
6. Open application in your browser `http://localhost:3000/`

### You have ability to add, delete and edit products in list

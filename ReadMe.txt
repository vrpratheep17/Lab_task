1. To start the frontend application 
    * Navigate to frontend/my-app and run 'npm install' to install the necessary packages
    * then run 'npm run start' to start the react application 
    * The application will be opened on the port 3000


2. To start the backend application 
    * Navigate to backend and run 'npm install' to install the necessary packages   
    * then run 'npm run dev' to start the Nodejs application 
    * The application will be opened on the port 4000 

********************************************************************************************
********************************************************************************************

1. Frontend 
    * The undo logic is handled via if any phase task is undo all the following up phase tasks status 
        will be changed to uncompleted but other task in the same phase and previous phase is remain unchanged

2. backend  
    * Backend is implemented via Graphql , all the task are stored in json and based on the given assignment
        there is need for only 3 Graphql API only the needed api is deleted. 

3. Schema Design
    * To design the schema I've used Sequelize considering the reason it's much easy to switch database 
        if needed and easy to maintain . 
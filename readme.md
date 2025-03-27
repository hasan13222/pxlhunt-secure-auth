## Secure Authentication system (Backend)

### Follow the below instructions to run the application in your local machine

- First clone the github repository or download the zip file
- run "npm install" command. Thus you can get all the required dependencies required for the application
- create a .env file in the project root directory
- write .env following field as per your choice
  ```
    DB_URL="place mongodb url"
    DB_PASS="database password"
    DB_USER="database username"
    PORT=5000
    NODE_ENV="development"
    SALT=12
    ACCESS_TOKEN_SECRET="give access token secret here"
    REFRESH_TOKEN_SECRET="give refresh token secret here"
    STRIPE_SECRET_KEY="place stripe secret key here"
  ```
- then run "npm run dev" command to run the application as development mode in your machine
- you can run "npm run test" command to test auth function of registration and login
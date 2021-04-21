# PERN-login-jwt-starter

### Description
This is boilerplate code for a basic login/signup portal, using Postgress, Node, Express and React.
- Passwords are encrypted with bcrypt
- Login creates a 1hr json web token
- Error and success notifications displayed with react-tostify
- Frontend is pre-configured with TailwindCSS 2.1.0

### Steps

1. Initialise postgres database - CREATE DATABASE [database name];
2. Create database table Login with SQL code from server/database.sql
3. Update database config in server/db.js
4. In terminal, cd into server and run "npm install" followed by "nodemon"
5. Open new terminal tab and cd into client. Run "npm install" followed by "npm run start"

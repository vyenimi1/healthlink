# healthlink

Database Setup:
1.	Install MySQL: Install MySQL on your local machine and set a password for the root user.
2.	Start MySQL Server: Run the MySQL server on your machine.
3.	Create Database Schema: Open your terminal and navigate to the directory where the dbquery.sql script is located. Then run the following command:
mysql --user=root -p </path/dbquery.sql
You will be prompted for the password you set earlier. This command will create the necessary database tables.
  


Backend:
1.	Install Maven and Java: Ensure you have Maven and Java installed on your system.
2.	Build and Run Backend: Open your terminal and navigate to the backend directory. Then execute the following commands:
mvn clean install
3.	Run the backend by change to target directory 
cd target
java –jar "name of the jar generated" 
   4, Make sure to update the application.yaml file with your database password.

 Frontend:
1.	Install Node.js and React: Install Node.js and React on your machine.
2.	Install Dependencies: Open your terminal and navigate to the frontend directory. Then run:
npm install
   3.Run the code using
     npm start

It will automatically open a tab in browser other use http://localhost:3000/login


Here I have already inserted few sample customers and hospitals details so ease the testing.

Hospital login:
Username – sample@email.com
Password: pass123

Customer login:
Username: user1@email.com
Password: password123







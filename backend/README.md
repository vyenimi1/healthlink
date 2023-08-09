Database Setup:

Install MySQL: Install MySQL on your local machine and set a password for the root user.
Start MySQL Server: Run the MySQL server on your machine.
Create Database Schema: Open your terminal and navigate to the directory where the dbquery.sql script is located. Then run the following command: mysql --user=root -p </path/dbquery.sql You will be prompted for the password you set earlier. This command will create the necessary database tables.
Backend:

Install Maven and Java: Ensure you have Maven and Java installed on your system.
Build and Run Backend: Open your terminal and navigate to the backend directory. Then execute the following commands: mvn clean install
Run the backend by change to target directory cd target java –jar "name of the jar generated" 4, Make sure to update the application.yaml file with your database password.

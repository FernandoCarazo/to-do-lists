Thank you for checking out my project. This a small task manager app for multiple users where you can manage users (Add, Modify, Delete) and aswell modify tasks for each user (Add, Modify, Delete). 
This project was the final step required in order to be able to graduate from the Code Minds Academy.

Down here I will leave info on how to test this locally on your PC. I'm currently working on having this available in an online web page so you don't need to do all those steps to be able to use the app so stay tuned!

In order to be able to run the project properly you will need to have/use the following software:
https://visualstudio.microsoft.com/vs/
https://code.visualstudio.com/
https://nodejs.org/es/download/
https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15

Each one will be used for the following purposes:
-Visual Studio 2026: Running API (Install with this workloads: ASP.NET, Web Development and .NET desktop development).
Visual Studio Code: Running Website/Frontend (Angular and npm must be installed).
SSMS: Running necessary DB queries.


Launching App:

DATABASE
1. Open the two SQL files included in /to-do-lists/ToDoDB/ using SQL Server Management Studio.
2. Run ToDoDBinit.sql first to iniate the DB.
3. Run ToDoDbTestData.sql to add demo data to the DB (this is not a requirement for the app to run but its very useful to test the app out of the box).

Once the database has been created successfully, you can proceed.

API 
1. Make sure that the following dependencies (NuGet Packages) are installed:
AutoMapper.Extensions.Microsoft.DependencyInjection
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.SqlServer.Design
Microsoft.EntityFrameworkCore.Tools

2. Run Program.cs for the API to start working.

APP UI (Frontend)
1. Make sure that Node JS is installed.
2. Open a terminal in the root of /to-do-lists/ToDoWeb/.
3. Run this command: "npm install -g @angular/cli".
4. Run "npm install" to install all required dependencies.
5. Run "ng serve --open" to launch the app locally 
6. Done. You can start to manage your users and tasks!


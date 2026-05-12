Programas necesarios para poder ejecutar el proyecto:

https://visualstudio.microsoft.com/vs/
https://code.visualstudio.com/
https://nodejs.org/es/download/
https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15


Cada uno se usa para los siguientes propósitos:
-API API (Instalar con los workloads ASP.nET and web development y .NET desktop development)
-WEB Página WEB (Se necesita instalar angular y npm)
-SQL Base de datos

Lo primero es una vez instalados los programas ejecutar ambos Queries (incluidos en /ToDo Project/ ToDo DB/) desde SQL Server Management Studio.
Una vez que se creó la base de datos correctamente se puede proseguir.


En Visual Studio 2022 se va a requerir de ciertas dependencias (NuGET Packages):
-AutoMapper.Extensions.Microsoft.DependencyInjection
-Microsoft.EntityFrameworkCore.SqlServer
-Microsoft.EntityFrameworkCore.SqlServer.Design
-Microsoft.EntityFrameworkCore.Tools
Se necesita iniciar el program.cs para que el API empiece a funcionar 

Después en Visual Studio Code 
Se ocupa en una terminal correr el siguiente comando: "npm install -g @angular/cli"
Después se instalan todas las dependencias mediante un JSON con el siguiente comando: "npm install"

Para lanzar la página "ng serve --open"




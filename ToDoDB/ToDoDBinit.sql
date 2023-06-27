--Si no existe, se crea la base de datos 
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ToDoDB')
BEGIN 
	CREATE DATABASE ToDoDB;
END 
GO
USE ToDoDB;
GO

--Si no existe, se crea la tabla Person
IF NOT EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'Person')
BEGIN 
	CREATE TABLE Person (
	Id INT IDENTITY(1,1) NOT NULL,
	FirstName VARCHAR(50) NOT NULL,
	LastName VARCHAR(50) NOT NULL,
	Email VARCHAR(50) NOT NULL UNIQUE,
	CONSTRAINT PKPerson PRIMARY KEY(Id),
);
END
GO

--Si no existe, se crea la tabla TaskStatus 
IF NOT EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'TaskStatus')
BEGIN
	CREATE TABLE TaskStatus(
	Id INT IDENTITY (1,1) NOT NULL,
	Status VARCHAR(20) NOT NULL,
	CONSTRAINT PKStatus PRIMARY KEY(Id) 
);	
END
GO

--Si no existe, se crea la tabla Task
IF NOT EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'Task')
BEGIN
	CREATE TABLE Task (
	Id INT IDENTITY (1,1) NOT NULL,
	TaskName VARCHAR(50) NOT NULL,
	TaskDescription VARCHAR (300) NOT NULL,
	TaskDate DATETIME2 NOT NULL,
	---------------------
	StatusId INT NOT NULL,
	PersonId INT NOT NULL,
	CONSTRAINT PKTask PRIMARY KEY(Id),
	CONSTRAINT FKPersonTaskPersonId     FOREIGN KEY (PersonId) REFERENCES Person(Id),
	CONSTRAINT FKTaskStatusTaskStatusId FOREIGN KEY (StatusId) REFERENCES TaskStatus(Id)	
);
END
GO

--Si no existen, se agregan los datos de estados a la tabla TaskStatus
IF NOT EXISTS (SELECT * FROM TaskStatus WHERE Status = 'Active')
BEGIN
	INSERT INTO TaskStatus(Status) VALUES ('Active')
END 

IF NOT EXISTS (SELECT * FROM TaskStatus WHERE Status = 'Completed')
BEGIN
	INSERT INTO TaskStatus(Status) VALUES ('Completed')
END

IF NOT EXISTS (SELECT * FROM TaskStatus WHERE Status = 'Canceled')
BEGIN
	INSERT INTO TaskStatus(Status) VALUES ('Canceled')
END 
GO
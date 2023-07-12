Use ToDoDB;

--Si no existen, se agregan datos de prueba a la tabla Person (Nombre y correo)
IF NOT EXISTS (SELECT * FROM Person WHERE FirstName = 'Fernando')
BEGIN
	INSERT INTO Person(FirstName, LastName, Email) VALUES ('Fernando', 'Carazo', 'fernando@gmail.com') 
END  

IF NOT EXISTS (SELECT * FROM Person WHERE FirstName = 'Axel')
BEGIN
	INSERT INTO Person(FirstName, LastName, Email) VALUES ('Axel', 'Gonzalez', 'axel@gmail.com')
END

IF NOT EXISTS (SELECT * FROM Person WHERE FirstName = 'Mario')
BEGIN
	INSERT INTO Person(FirstName, LastName, Email) VALUES ('Mario', 'Hernandez', 'mario@gmail.com') 
END 



IF NOT EXISTS(SELECT * FROM Assignment WHERE AssignmentName = 'Walk the Dog'
)
--Si no existen, se agregan datos de prueba a la tabla Assignment (Nombre, descripcion, estado, y persona ligada)
BEGIN
	INSERT INTO Assignment(AssignmentName, AssignmentDescription, AssignmentDate, PersonId, StatusId) VALUES ('Walk the Dog', 'Take the dog for a brisk walk', '2023-07-15 06:00:00.000', 1, 1)
END
GO


IF NOT EXISTS(SELECT * FROM Assignment WHERE AssignmentName = 'Grocery Shopping'
)
BEGIN
	INSERT INTO Assignment(AssignmentName, AssignmentDescription, AssignmentDate, PersonId, StatusId) VALUES ('Grocery Shopping', 'Compile a list of necessary groceries and head to the nearest supermarket or grocery store.', '2023-07-28 19:00:00.000', 2, 1)
END
GO

IF NOT EXISTS(SELECT * FROM Assignment WHERE AssignmentName = 'Pay Bills'
)
BEGIN
	INSERT INTO Assignment(AssignmentName, AssignmentDescription, AssignmentDate, PersonId, StatusId) VALUES ('Pay Bills', 'Set aside time to review and pay outstanding bills.', '2023-07-25 20:30:00.000', 3, 3)
END
GO

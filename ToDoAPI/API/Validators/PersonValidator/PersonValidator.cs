using API.Data;
using API.DataTransferObjects;

namespace API.Validators
{
    public class PersonValidator : IPersonValidator
    {
        private readonly ToDoDB _database;

        public PersonValidator(ToDoDB database)
        {
            this._database = database;
        }

        public bool ValidateInsert(InsertUpdatePersonDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            //FirstName
            if (string.IsNullOrWhiteSpace(data.FirstName))
            {
                innerMessages.Add("Nombre es requerido");
            }
            else if (data.FirstName.Length > 50)
            {
                innerMessages.Add("Nombre no puede contener más de 50 caracteres");
            }
            //LastName
            if (string.IsNullOrWhiteSpace(data.LastName))
            {
                innerMessages.Add("Apellido es requerido");
            }
            else if (data.LastName.Length > 50)
            {
                innerMessages.Add("Apellido no puede contener más de 50 caracteres");
            }
            //Email
            if (string.IsNullOrWhiteSpace(data.Email))
            {
                innerMessages.Add("Email es requerido");
            }
            else if (data.Email.Length > 50)
            {
                innerMessages.Add("Email no puede contener más de 50 caracteres");
            }
            else if (this._database.Person.Any(p => p.Email == data.Email))
            {
                innerMessages.Add("Ya hay una persona registrada con este email");
            }

            messages.AddRange(innerMessages);
            return !innerMessages.Any();
        }

        public bool ValidateUpdate(InsertUpdatePersonDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            //FirstName
            if (string.IsNullOrWhiteSpace(data.FirstName))
            {
                innerMessages.Add("Nombre es requerido");
            }
            else if (data.FirstName.Length > 50)
            {
                innerMessages.Add("Nombre no puede contener más de 50 caracteres");
            }
            //LastName
            if (string.IsNullOrWhiteSpace(data.LastName))
            {
                innerMessages.Add("Apellido es requerido");
            }
            else if (data.LastName.Length > 50)
            {
                innerMessages.Add("Apellido no puede contener más de 50 caracteres");
            }
            //Email
            if (string.IsNullOrWhiteSpace(data.Email))
            {
                innerMessages.Add("Email es requerido");
            }
            else if (data.Email.Length > 50)
            {
                innerMessages.Add("Email no puede contener más de 50 caracteres");
            }
            else if (this._database.Person.Any(p => p.Email == data.Email))
            {
                innerMessages.Add("Ya hay una persona registrada con este email");
            }
            messages.AddRange(innerMessages);
            return !innerMessages.Any();
        }
        public bool ValidateDelete(int id, List<string> messages)
        {
            List<string> innerMessages = new();

            if (this._database.Assignment.Any(a => a.PersonId == id))
            {
                innerMessages.Add("No se puede borrar la persona. La persona tiene tareas asociadas en el sistema");
            }

            messages.AddRange(innerMessages);
            return !innerMessages.Any();
        }

    }
}
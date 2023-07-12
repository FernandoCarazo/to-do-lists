using API.Data;
using API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services.PersonService
{
    public class PersonService : IPersonService
    {
        private readonly ToDoDB _database;
        public PersonService(ToDoDB database)
        {
           this. _database = database;
        }
        public IQueryable<Person> ListPersons()
        {
            return this._database.Person;
        }

        public async Task<Person?> FindPerson(int id)
        {
            return await this._database
                              .Person
                              .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task InsertPerson(Person entity)
        {
           this._database.Person.Add(entity);
           await this._database.SaveChangesAsync();
        }
        public async Task UpdatePerson(Person entity)
        {
            this._database.Person.Update(entity);
            await this._database.SaveChangesAsync();
        }
        public async Task DeletePerson(Person entity)
        {
            this._database.Person.Remove(entity);
            await this._database.SaveChangesAsync();
        }
    }
}

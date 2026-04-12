using Contacts.Domain.Entities;

namespace Contacts.Domain.Interfaces;

public interface IContactRepository
{
    Task<IEnumerable<Contact>> GetAllActiveAsync();
    Task<Contact?> GetActiveByIdAsync(Guid id);
    Task<Contact?> GetByIdAsync(Guid id);
    Task AddAsync(Contact contact);
    Task UpdateAsync(Contact contact);
    Task DeleteAsync(Contact contact);
    Task SaveChangesAsync();
}

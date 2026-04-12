using Contacts.Domain.Entities;
using Contacts.Domain.Interfaces;
using Contacts.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly AppDbContext _context;

    public ContactRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Contact>> GetAllActiveAsync() =>
        await _context.Contacts.Where(c => c.IsActive).ToListAsync();

    public async Task<Contact?> GetActiveByIdAsync(Guid id) =>
        await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

    public async Task<Contact?> GetByIdAsync(Guid id) =>
        await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

    public async Task AddAsync(Contact contact) =>
        await _context.Contacts.AddAsync(contact);

    public Task UpdateAsync(Contact contact)
    {
        _context.Contacts.Update(contact);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(Contact contact)
    {
        _context.Contacts.Remove(contact);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync() =>
        await _context.SaveChangesAsync();
}

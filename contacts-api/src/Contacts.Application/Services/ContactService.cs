using Contacts.Application.DTOs;
using Contacts.Application.Interfaces;
using Contacts.Domain.Entities;
using Contacts.Domain.Interfaces;

namespace Contacts.Application.Services;

public class ContactService : IContactService
{
    private readonly IContactRepository _repository;

    public ContactService(IContactRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedResultDto<ContactResponseDto>> GetAllActiveAsync(int page = 1, int pageSize = 10)
    {
        var contacts = await _repository.GetAllActiveAsync();
        var total = await _repository.CountActiveAsync();

        var items = contacts
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(ContactResponseDto.FromEntity);

        return new PagedResultDto<ContactResponseDto>(items, total, page, pageSize);
    }

    public async Task<ContactResponseDto> GetByIdAsync(Guid id)
    {
        var contact = await _repository.GetActiveByIdAsync(id)
            ?? throw new KeyNotFoundException($"Contato {id} não encontrado ou inativo.");

        return ContactResponseDto.FromEntity(contact);
    }

    public async Task<ContactResponseDto> CreateAsync(ContactRequestDto dto)
    {
        var contact = Contact.Create(dto.Name, dto.BirthDate, dto.Gender);
        await _repository.AddAsync(contact);
        await _repository.SaveChangesAsync();
        return ContactResponseDto.FromEntity(contact);
    }

    public async Task<ContactResponseDto> UpdateAsync(Guid id, ContactRequestDto dto)
    {
        var contact = await _repository.GetActiveByIdAsync(id)
            ?? throw new KeyNotFoundException($"Contato {id} não encontrado ou inativo.");

        contact.Update(dto.Name, dto.BirthDate, dto.Gender);
        await _repository.UpdateAsync(contact);
        await _repository.SaveChangesAsync();
        return ContactResponseDto.FromEntity(contact);
    }

    public async Task DeactivateAsync(Guid id)
    {
        var contact = await _repository.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Contato {id} não encontrado.");

        contact.Deactivate();
        await _repository.UpdateAsync(contact);
        await _repository.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var contact = await _repository.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Contato {id} não encontrado.");

        await _repository.DeleteAsync(contact);
        await _repository.SaveChangesAsync();
    }
}

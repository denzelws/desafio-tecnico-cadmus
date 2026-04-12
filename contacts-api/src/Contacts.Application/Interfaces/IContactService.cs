using Contacts.Application.DTOs;

namespace Contacts.Application.Interfaces;

public interface IContactService
{
    Task<IEnumerable<ContactResponseDto>> GetAllActiveAsync();
    Task<ContactResponseDto> GetByIdAsync(Guid id);
    Task<ContactResponseDto> CreateAsync(ContactRequestDto dto);
    Task<ContactResponseDto> UpdateAsync(Guid id, ContactRequestDto dto);
    Task DeactivateAsync(Guid id);
    Task DeleteAsync(Guid id);
}

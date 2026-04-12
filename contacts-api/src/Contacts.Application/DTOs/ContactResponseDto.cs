using Contacts.Domain.Entities;
using Contacts.Domain.Enums;

namespace Contacts.Application.DTOs;

public record ContactResponseDto(
    Guid Id,
    string Name,
    DateTime BirthDate,
    int Age,
    Gender Gender,
    bool IsActive,
    DateTime CreatedAt,
    DateTime? UpdatedAt
)
{
    public static ContactResponseDto FromEntity(Contact contact) => new(
        contact.Id,
        contact.Name,
        contact.BirthDate,
        contact.Age,
        contact.Gender,
        contact.IsActive,
        contact.CreatedAt,
        contact.UpdatedAt
    );
}

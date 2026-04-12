using Contacts.Domain.Enums;

namespace Contacts.Application.DTOs;

public record ContactRequestDto(
    string Name,
    DateTime BirthDate,
    Gender Gender
);

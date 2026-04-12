using Contacts.Domain.Enums;
using Contacts.Domain.Exceptions;

namespace Contacts.Domain.Entities;

public class Contact
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public DateTime BirthDate { get; private set; }
    public Gender Gender { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    public int Age => CalculateAge();

    private Contact() { }

    public static Contact Create(string name, DateTime birthDate, Gender gender)
    {
        var contact = new Contact
        {
            Id = Guid.NewGuid(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
        };

        contact.SetName(name);
        contact.SetBirthDate(birthDate);
        contact.SetGender(gender);

        return contact;
    }

    public void Update(string name, DateTime birthDate, Gender gender)
    {
        SetName(name);
        SetBirthDate(birthDate);
        SetGender(gender);
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        if (!IsActive)
            throw new DomainException("Contato já está inativo.");

        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    private void SetName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Nome é obrigatório.");

        if (name.Length > 150)
            throw new DomainException("Nome não pode ultrapassar 150 caracteres.");

        Name = name.Trim();
    }

    private void SetBirthDate(DateTime birthDate)
    {
        if (birthDate.Date >= DateTime.UtcNow.Date)
            throw new DomainException("Data de nascimento não pode ser maior ou igual à data de hoje.");

        var age = CalculateAge(birthDate);

        if (age == 0)
            throw new DomainException("Idade não pode ser igual a 0.");

        if (age < 18)
            throw new DomainException("O contato deve ser maior de idade.");

        BirthDate = birthDate;
    }

    private void SetGender(Gender gender)
    {
        if (!Enum.IsDefined(typeof(Gender), gender))
            throw new DomainException("Sexo inválido.");

        Gender = gender;
    }

    private int CalculateAge() => CalculateAge(BirthDate);

    private static int CalculateAge(DateTime birthDate)
    {
        var today = DateTime.UtcNow.Date;
        var age = today.Year - birthDate.Year;
        if (birthDate.Date > today.AddYears(-age)) age--;
        return age;
    }
}

using Contacts.Domain.Entities;
using Contacts.Domain.Enums;
using Contacts.Domain.Exceptions;
using Xunit;

namespace Contacts.Tests.Domain;

public class ContactTests
{
    private static DateTime ValidBirthDate => DateTime.UtcNow.AddYears(-25);

    [Fact]
    public void Create_ValidData_ShouldCreateContact()
    {
        var contact = Contact.Create("João Silva", ValidBirthDate, Gender.Male);

        Assert.Equal("João Silva", contact.Name);
        Assert.Equal(Gender.Male, contact.Gender);
        Assert.True(contact.IsActive);
        Assert.True(contact.Age >= 18);
    }

    [Fact]
    public void Create_UnderagePerson_ShouldThrowDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-17);

        var ex = Assert.Throws<DomainException>(() =>
            Contact.Create("Menor Idade", birthDate, Gender.Female));

        Assert.Contains("maior de idade", ex.Message);
    }

    [Fact]
    public void Create_FutureBirthDate_ShouldThrowDomainException()
    {
        var birthDate = DateTime.UtcNow.AddDays(1);

        var ex = Assert.Throws<DomainException>(() =>
            Contact.Create("Futuro", birthDate, Gender.Male));

        Assert.Contains("não pode ser maior", ex.Message);
    }

    [Fact]
    public void Create_TodayBirthDate_ShouldThrowDomainException()
    {
        var birthDate = DateTime.UtcNow.Date;

        Assert.Throws<DomainException>(() =>
            Contact.Create("Hoje", birthDate, Gender.Male));
    }

    [Fact]
    public void Create_EmptyName_ShouldThrowDomainException()
    {
        Assert.Throws<DomainException>(() =>
            Contact.Create("", ValidBirthDate, Gender.Male));
    }

    [Fact]
    public void Create_NameTooLong_ShouldThrowDomainException()
    {
        var longName = new string('A', 151);

        Assert.Throws<DomainException>(() =>
            Contact.Create(longName, ValidBirthDate, Gender.Male));
    }

    [Fact]
    public void Deactivate_ActiveContact_ShouldDeactivate()
    {
        var contact = Contact.Create("João Silva", ValidBirthDate, Gender.Male);

        contact.Deactivate();

        Assert.False(contact.IsActive);
    }

    [Fact]
    public void Deactivate_AlreadyInactive_ShouldThrowDomainException()
    {
        var contact = Contact.Create("João Silva", ValidBirthDate, Gender.Male);
        contact.Deactivate();

        Assert.Throws<DomainException>(() => contact.Deactivate());
    }

    [Fact]
    public void Age_ShouldBeCalculatedAtRuntime()
    {
        var birthDate = DateTime.UtcNow.AddYears(-30);
        var contact = Contact.Create("João Silva", birthDate, Gender.Male);

        Assert.Equal(30, contact.Age);
    }

    [Fact]
    public void Update_ValidData_ShouldUpdateContact()
    {
        var contact = Contact.Create("João Silva", ValidBirthDate, Gender.Male);

        contact.Update("João Atualizado", ValidBirthDate, Gender.Other);

        Assert.Equal("João Atualizado", contact.Name);
        Assert.Equal(Gender.Other, contact.Gender);
        Assert.NotNull(contact.UpdatedAt);
    }
}

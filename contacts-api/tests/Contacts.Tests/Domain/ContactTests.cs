using Contacts.Domain.Entities;
using Contacts.Domain.Enums;
using Contacts.Domain.Exceptions;
using Xunit;

namespace Contacts.Tests.Domain;

public class ContactTests
{
    #region Create

    [Fact]
    public void Create_ValidData_ShouldCreateContact()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);

        var contact = Contact.Create("João Silva", birthDate, Gender.Male);

        Assert.NotNull(contact);
        Assert.Equal("João Silva", contact.Name);
        Assert.Equal(birthDate, contact.BirthDate);
        Assert.Equal(Gender.Male, contact.Gender);
        Assert.True(contact.IsActive);
        Assert.Equal(25, contact.Age);
    }

    [Fact]
    public void Create_MenorDeIdade_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-17);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create("João", birthDate, Gender.Male));

        Assert.Contains("maior de idade", exception.Message);
    }

    [Fact]
    public void Create_DataFutura_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddDays(1);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create("João", birthDate, Gender.Male));

        Assert.Contains("Data de nascimento não pode ser maior ou igual à data de hoje", exception.Message);
    }

    [Fact]
    public void Create_NomeVazio_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create("", birthDate, Gender.Male));

        Assert.Contains("Nome", exception.Message);
    }

    [Fact]
    public void Create_NomeNulo_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create(null!, birthDate, Gender.Male));

        Assert.Contains("Nome", exception.Message);
    }

    [Fact]
    public void Create_NomeMaiorQue150Caracteres_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);
        var name = new string('A', 151);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create(name, birthDate, Gender.Male));

        Assert.Contains("150", exception.Message);
    }

    [Fact]
    public void Create_SexoInvalido_ThrowsDomainException()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);

        var exception = Assert.Throws<DomainException>(() =>
            Contact.Create("João", birthDate, (Gender)99));

        Assert.Contains("Sexo", exception.Message);
    }

    #endregion

    #region Update

    [Fact]
    public void Update_ValidData_ShouldUpdateContact()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        var newBirthDate = DateTime.UtcNow.AddYears(-30);

        contact.Update("João Silva", newBirthDate, Gender.Male);

        Assert.Equal("João Silva", contact.Name);
        Assert.Equal(30, contact.Age);
    }

    [Fact]
    public void Update_MenorDeIdade_ThrowsDomainException()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        var newBirthDate = DateTime.UtcNow.AddYears(-17);

        var exception = Assert.Throws<DomainException>(() =>
            contact.Update("João", newBirthDate, Gender.Male));

        Assert.Contains("maior de idade", exception.Message);
    }

    #endregion

    #region Deactivate

    [Fact]
    public void Deactivate_ActiveContact_ShouldDeactivate()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);

        contact.Deactivate();

        Assert.False(contact.IsActive);
    }

    [Fact]
    public void Deactivate_AlreadyInactive_ThrowsDomainException()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        contact.Deactivate();

        var exception = Assert.Throws<DomainException>(() =>
            contact.Deactivate());

        Assert.Contains("inativo", exception.Message);
    }

    #endregion

    #region Age Calculation

    [Theory]
    [InlineData(20)]
    [InlineData(25)]
    [InlineData(30)]
    [InlineData(50)]
    public void Age_CalculatedCorrectly(int yearsAgo)
    {
        var birthDate = DateTime.UtcNow.AddYears(-yearsAgo);

        var contact = Contact.Create("João", birthDate, Gender.Male);

        Assert.Equal(yearsAgo, contact.Age);
    }

    [Fact]
    public void Age_CalculatedOnRuntime()
    {
        var birthDate = DateTime.UtcNow.AddYears(-25);

        var contact = Contact.Create("João", birthDate, Gender.Male);
        var ageBefore = contact.Age;

        Assert.Equal(ageBefore, contact.Age);
    }

    #endregion
}

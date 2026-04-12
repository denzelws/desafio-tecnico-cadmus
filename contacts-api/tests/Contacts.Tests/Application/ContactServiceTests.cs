using Contacts.Application.DTOs;
using Contacts.Application.Services;
using Contacts.Domain.Entities;
using Contacts.Domain.Enums;
using Contacts.Domain.Interfaces;
using Moq;
using Xunit;

namespace Contacts.Tests.Application;

public class ContactServiceTests
{
    private readonly Mock<IContactRepository> _repositoryMock = new();
    private readonly ContactService _service;

    public ContactServiceTests()
    {
        _service = new ContactService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetAllActiveAsync_ShouldReturnOnlyActiveContacts()
    {
        var contacts = new List<Contact>
        {
            Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male),
            Contact.Create("Maria", DateTime.UtcNow.AddYears(-30), Gender.Female),
        };

        _repositoryMock.Setup(r => r.GetAllActiveAsync()).ReturnsAsync(contacts);
        _repositoryMock.Setup(r => r.CountActiveAsync()).ReturnsAsync(2);

        var result = await _service.GetAllActiveAsync();

        Assert.Equal(2, result.TotalCount);
        _repositoryMock.Verify(r => r.GetAllActiveAsync(), Times.Once);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingContact_ShouldReturnContact()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        _repositoryMock.Setup(r => r.GetActiveByIdAsync(contact.Id)).ReturnsAsync(contact);

        var result = await _service.GetByIdAsync(contact.Id);

        Assert.Equal(contact.Id, result.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NotFound_ShouldThrowKeyNotFoundException()
    {
        _repositoryMock.Setup(r => r.GetActiveByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Contact?)null);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            _service.GetByIdAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task CreateAsync_ValidData_ShouldCreateAndReturn()
    {
        var dto = new ContactRequestDto("João Silva", DateTime.UtcNow.AddYears(-25), Gender.Male);

        _repositoryMock.Setup(r => r.AddAsync(It.IsAny<Contact>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _service.CreateAsync(dto);

        Assert.Equal("João Silva", result.Name);
        Assert.True(result.IsActive);
        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<Contact>()), Times.Once);
        _repositoryMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ExistingContact_ShouldUpdate()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        var dto = new ContactRequestDto("João Atualizado", DateTime.UtcNow.AddYears(-25), Gender.Male);

        _repositoryMock.Setup(r => r.GetActiveByIdAsync(contact.Id)).ReturnsAsync(contact);
        _repositoryMock.Setup(r => r.UpdateAsync(It.IsAny<Contact>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        var result = await _service.UpdateAsync(contact.Id, dto);

        Assert.Equal("João Atualizado", result.Name);
        _repositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Contact>()), Times.Once);
    }

    [Fact]
    public async Task DeactivateAsync_ExistingContact_ShouldDeactivate()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        _repositoryMock.Setup(r => r.GetByIdAsync(contact.Id)).ReturnsAsync(contact);
        _repositoryMock.Setup(r => r.UpdateAsync(It.IsAny<Contact>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _service.DeactivateAsync(contact.Id);

        Assert.False(contact.IsActive);
        _repositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Contact>()), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_NotFound_ShouldThrowKeyNotFoundException()
    {
        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Contact?)null);

        await Assert.ThrowsAsync<KeyNotFoundException>(() =>
            _service.DeleteAsync(Guid.NewGuid()));
    }

    [Fact]
    public async Task DeleteAsync_ExistingContact_ShouldDelete()
    {
        var contact = Contact.Create("João", DateTime.UtcNow.AddYears(-25), Gender.Male);
        _repositoryMock.Setup(r => r.GetByIdAsync(contact.Id)).ReturnsAsync(contact);
        _repositoryMock.Setup(r => r.DeleteAsync(It.IsAny<Contact>())).Returns(Task.CompletedTask);
        _repositoryMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);

        await _service.DeleteAsync(contact.Id);

        _repositoryMock.Verify(r => r.DeleteAsync(It.IsAny<Contact>()), Times.Once);
    }
}

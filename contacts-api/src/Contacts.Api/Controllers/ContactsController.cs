using Contacts.Application.DTOs;
using Contacts.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.Api.Controllers;

[ApiController]
[Route("api/contacts")]
[Produces("application/json")]
public class ContactsController : ControllerBase
{
    private readonly IContactService _service;

    public ContactsController(IContactService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ContactResponseDto>), 200)]
    public async Task<IActionResult> GetAll()
    {
        var contacts = await _service.GetAllActiveAsync();
        return Ok(contacts);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ContactResponseDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var contact = await _service.GetByIdAsync(id);
        return Ok(contact);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ContactResponseDto), 201)]
    [ProducesResponseType(422)]
    public async Task<IActionResult> Create([FromBody] ContactRequestDto dto)
    {
        var contact = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ContactResponseDto), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(422)]
    public async Task<IActionResult> Update(Guid id, [FromBody] ContactRequestDto dto)
    {
        var contact = await _service.UpdateAsync(id, dto);
        return Ok(contact);
    }

    [HttpPatch("{id:guid}/deactivate")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [ProducesResponseType(422)]
    public async Task<IActionResult> Deactivate(Guid id)
    {
        await _service.DeactivateAsync(id);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}

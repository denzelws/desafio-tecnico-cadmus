using Contacts.Application.DTOs;
using FluentValidation;

namespace Contacts.Application.Validators;

public class ContactRequestValidator : AbstractValidator<ContactRequestDto>
{
    public ContactRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Nome é obrigatório")
            .MaximumLength(150).WithMessage("Nome não pode ultrapassar 150 caracteres");

        RuleFor(x => x.BirthDate)
            .NotEmpty().WithMessage("Data de nascimento é obrigatória");

        RuleFor(x => x.Gender)
            .IsInEnum().WithMessage("Sexo inválido");
    }
}

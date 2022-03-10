using System.Threading;
using System.Threading.Tasks;using AutoMapper;
using Domain;
using MediatR;
using DatabaseLogic;

namespace Application.Questions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Question Question { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await this.context.Questions.FindAsync(request.Question.Id);

                this.mapper.Map(request.Question, question);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
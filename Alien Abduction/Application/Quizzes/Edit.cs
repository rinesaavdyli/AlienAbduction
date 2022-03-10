using System.Threading;
using System.Threading.Tasks;using AutoMapper;
using Domain;
using MediatR;
using DatabaseLogic;

namespace Application.Quizzes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Quiz Quiz { get; set; }
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
                var quiz = await this.context.Quizzes.FindAsync(request.Quiz.Id);

                this.mapper.Map(request.Quiz, quiz);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
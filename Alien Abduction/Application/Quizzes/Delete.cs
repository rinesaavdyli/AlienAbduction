using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using DatabaseLogic;

namespace Application.Quizzes
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var quiz = await this.context.Quizzes.FindAsync(request.Id);

                this.context.Remove(quiz);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
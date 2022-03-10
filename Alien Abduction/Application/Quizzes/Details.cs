using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using DatabaseLogic;

namespace Application.Quizzes
{
    public class Details
    {
        public class Query : IRequest<Quiz>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Quiz>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Quiz> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Quizzes.FindAsync(request.Id);
            }
        }
    }
}

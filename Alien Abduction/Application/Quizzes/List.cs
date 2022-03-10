using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DatabaseLogic;

namespace Application.Quizzes
{
    public class List
    {
        public class Query : IRequest<List<Quiz>> { }

        public class Handler : IRequestHandler<Query, List<Quiz>>
        {
            private readonly DataContext context;
            public Handler(DataContext context )
            {
                this.context = context;
            }


            public async Task<List<Quiz>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Quizzes.ToListAsync(cancellationToken);
            }
        }
    }
}
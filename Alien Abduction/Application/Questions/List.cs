using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DatabaseLogic;

namespace Application.Questions
{
    public class List
    {
        public class Query : IRequest<List<Question>> { }

        public class Handler : IRequestHandler<Query, List<Question>>
        {
            private readonly DataContext context;
            public Handler(DataContext context )
            {
                this.context = context;
            }


            public async Task<List<Question>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await this.context.Questions.ToListAsync(cancellationToken);
            }
        }
    }
}
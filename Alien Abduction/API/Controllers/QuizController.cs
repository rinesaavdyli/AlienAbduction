using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Quizzes;
using System.Threading;

namespace API.Controllers
{
    public class QuizController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> GetQuizzes()
        {
            return await this.Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(Guid id)
        {
            return Ok(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task <IActionResult> CreateQuiz(Quiz quiz)
        {
            return Ok(await Mediator.Send(new Create.Command { Quiz = quiz }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuiz(Guid id, Quiz quiz)
        {
            quiz.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Quiz = quiz }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}


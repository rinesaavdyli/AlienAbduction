using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Questions;
using System.Threading;

namespace API.Controllers
{
    public class QuestionController : BaseApiController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetQuestions()
        {
            return await this.Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(Guid id)
        {
            return Ok(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task <IActionResult> CreateQuestion(Question question)
        {
            return Ok(await Mediator.Send(new Create.Command { Question = question }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditQuestion(Guid id, Question question)
        {
            question.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Question = question }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}


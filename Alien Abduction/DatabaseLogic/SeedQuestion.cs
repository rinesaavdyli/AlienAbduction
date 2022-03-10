using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace DatabaseLogic
{
    public class SeedQuestion
    {
        public static async Task SeedData(DataContext context)
    {
        if (context.Questions.Any()) return;

        var questions = new List<Question>
            {
                new Question
                {
                    QuestionText = "UBT",
                    Answer = "RinesaRafuna",
                    Option = "RinesaAvdyli"
                },
                new Question
                {
                   QuestionText = "UBT12345",
                    Answer = "Lidra",
                    Option = "Rinesat"
                },
            };

        await context.Questions.AddRangeAsync(questions);
        await context.SaveChangesAsync();
    }
}
}

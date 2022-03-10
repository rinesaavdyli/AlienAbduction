using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace DatabaseLogic
{
    public class SeedQuiz
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Quizzes.Any()) return;

            var quizzes = new List<Quiz>
            {
                new Quiz
                {
                    QuizName = "UBT",
                    Timer = 20,
                    Owner = "Rinesa"
                },
                new Quiz
                {
                    QuizName = "UBT12",
                    Timer = 30,
                    Owner = "RinesaR"
                },
                new Quiz
                {
                    QuizName = "UBT123",
                    Timer = 40,
                    Owner = "Lidra"
                },
            };

            await context.Quizzes.AddRangeAsync(quizzes);
            await context.SaveChangesAsync();
        }
    }
}

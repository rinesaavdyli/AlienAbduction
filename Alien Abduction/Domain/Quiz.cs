using System;
using System.Collections.Generic;

namespace Domain
{
    public class Quiz
    {
        public Guid Id { get; set; }
        public string QuizName { get; set; }
        public int Timer { get; set; }
        public string Owner { get; set; }
        public ICollection<Question> Questions { get; set; } = new List<Question>();

    }
}

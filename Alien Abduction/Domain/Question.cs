using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Question
    {
        public Guid Id { get; set; }
        public string QuestionText { get; set; }
        public string Answer { get; set; }
        public string Option { get; set; }
        public string QuiziId { get; set; }
        public Quiz Quiz { get; set; }


    }
}

using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public string? Name { get; set; } 
        public string? AnswerText { get; set; }

    }
}

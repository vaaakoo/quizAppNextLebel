using BlogServer.Context;
using BlogServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnswerController(AppDbContext context)
        {
            _context = context;
        }


        [HttpPost("{questionId}")]
        public async Task<ActionResult<Answer>> AddAnswer(int questionId, [FromBody] Answer answer)
        {
            if (string.IsNullOrEmpty(answer.Name) || string.IsNullOrEmpty(answer.AnswerText))
            {
                return BadRequest("Name and AnswerText are required fields.");
            }

            var question = await _context.questions.FindAsync(questionId);
            if (question == null)
            {
                return NotFound();
            }

            // Assign the question ID to the answer
            answer.QuestionId = questionId;

            _context.answers.Add(answer);
            await _context.SaveChangesAsync();

            // Optionally return the newly created answer
            return CreatedAtAction(nameof(GetAnswer), new { questionId, answerId = answer.Id }, answer);
        }

        [HttpGet("distinctUsers")]
        public async Task<ActionResult<IEnumerable<string>>> GetDistinctUsers()
        {
            var users = await _context.answers
                                       .Where(a => !string.IsNullOrEmpty(a.Name))
                                       .Select(a => a.Name)
                                       .Distinct()
                                       .ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            return users;
        }



        [HttpGet("{questionId}/answer/{answerId}")]
        public async Task<ActionResult<Answer>> GetAnswer(int questionId, int answerId)
        {
            var answer = await _context.answers.FirstOrDefaultAsync(a => a.QuestionId == questionId && a.Id == answerId);
            if (answer == null)
            {
                return NotFound();
            }
            return answer;
        }

        [HttpGet("byName/{name}")]
        public async Task<ActionResult<IEnumerable<Answer>>> GetAnswersByName(string name)
        {
            var answers = await _context.answers.Where(a => a.Name == name).ToListAsync();

            if (answers == null || !answers.Any())
            {
                return NotFound();
            }

            return answers;
        }

        [HttpGet("{questionId}")]
        public async Task<ActionResult<QuestionWithAnswers>> GetQuestionWithAnswers(int questionId)
        {
            var question = await _context.questions.FindAsync(questionId);
            if (question == null)
            {
                return NotFound();
            }

            var answers = await _context.answers.Where(a => a.QuestionId == questionId).ToListAsync();

            var questionWithAnswers = new QuestionWithAnswers
            {
                Question = question,
                Answers = answers
            };

            return questionWithAnswers;
        }

        //სახელით გაფილტვრა
        [HttpGet("dataByUserName/{name}")]
        public async Task<ActionResult<IEnumerable<QuestionWithAnswers>>> GetDataByUserName(string name)
        {
            var questionsWithAnswers = new List<QuestionWithAnswers>();

            // Get all distinct question IDs associated with the user
            var distinctQuestionIds = await _context.answers
                                                    .Where(a => a.Name == name)
                                                    .Select(a => a.QuestionId)
                                                    .Distinct()
                                                    .ToListAsync();

            foreach (var questionId in distinctQuestionIds)
            {
                var question = await _context.questions.FindAsync(questionId);
                if (question != null)
                {
                    var answers = await _context.answers
                                                .Where(a => a.Name == name && a.QuestionId == questionId)
                                                .ToListAsync();

                    var questionWithAnswers = new QuestionWithAnswers
                    {
                        Question = question,
                        Answers = answers
                    };

                    questionsWithAnswers.Add(questionWithAnswers);
                }
            }

            if (!questionsWithAnswers.Any())
            {
                return NotFound();
            }

            return questionsWithAnswers;
        }

    }
}

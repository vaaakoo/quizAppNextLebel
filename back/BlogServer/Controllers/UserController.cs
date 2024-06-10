using BlogServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Text;
using BlogServer.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;


namespace BlogServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;


        public UserController(AppDbContext context)
        {
            _authContext = context;

        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

          
            userObj.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userObj.Password);


            await _authContext.AddAsync(userObj);
            await _authContext.SaveChangesAsync();

            return Ok(new
            {
                Status = 200,
                Message = "რეგისტრაცია გავლილია!"
            });
        }


        [HttpGet("getUser")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var user =  await _authContext.Users.ToListAsync();
                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);

                return StatusCode(500, new { Message = "Internal Server Error" });
            }
        }

        [HttpGet("getUser/{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = _authContext.Users.FirstOrDefault(u => u.Id == id);

                if (user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(ex);
                return StatusCode(500, new { Message = "Internal Server Error" });
            }
        }

        

    }


}

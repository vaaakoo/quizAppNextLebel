using BlogServer.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogServer.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Question> questions { get; set; }

        public DbSet<Answer> answers { get; set; }


    }
}

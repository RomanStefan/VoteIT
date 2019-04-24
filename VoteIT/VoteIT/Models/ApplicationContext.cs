using Microsoft.EntityFrameworkCore;

namespace VoteIT.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Voter> Voters { get; set; }
    }
}

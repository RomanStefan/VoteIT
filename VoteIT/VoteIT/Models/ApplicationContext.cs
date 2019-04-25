using Microsoft.EntityFrameworkCore;

namespace VoteIT.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<Voter> Voters { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}

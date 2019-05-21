using Microsoft.EntityFrameworkCore;

namespace VoteIT.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        public DbSet<City> Cities { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<VotingHistory> VotingsHistory { get; set; }
        public DbSet<VotingSesion> VotingSesions { get; set; }
    }
}

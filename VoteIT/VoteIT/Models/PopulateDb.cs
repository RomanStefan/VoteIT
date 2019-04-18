using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace VoteIT.Models
{
    public static class PopulateDb
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ApplicationContext>>()))
            {
                // Look for any movies.
                if (context.Voters.Any())
                {
                    return;   // DB has been seeded
                }

                context.Voters.AddRange(
                    new Voter
                    {
                        Cnp = 2920209226725,
                        FirstName = "ROMAN",
                        LastName = "ELENA-ALEXANDRA"
                    },

                    new Voter
                    {
                        Cnp = 2960613270022,
                        FirstName = "MATIES",
                        LastName = "PETRUTA"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
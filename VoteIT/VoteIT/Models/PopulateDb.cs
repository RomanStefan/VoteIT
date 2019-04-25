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
                // Look for any voters.
                if (context.Voters.Any())
                {
                    return;   // DB has been seeded
                }
                else
                {
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
                }

                // Look for any Candidate.
                if (context.Candidates.Any())
                {
                    return;   // DB has been seeded
                }

                context.Candidates.AddRange(
                    new Candidate
                    {
                        FirstName = "Ion",
                        LastName = "Ion",
                        CityId = 22,
                        PersonalDescription = "I'm here to steal",
                        PoliticalParty = "PSD"
                    },

                    new Candidate
                    {
                        FirstName = "Victor",
                        LastName = "Viorel",
                        CityId = 22,
                        PersonalDescription = "I'm here to steal from you",
                        PoliticalParty = "PNL"
                    }
                );


                context.SaveChanges();
            }
        }
    }
}
using System;
using System.ComponentModel.DataAnnotations;

namespace VoteIT.Models
{
    public class VotingHistory
    {
        public int Id { get; set; }

        public int CandidateId { get; set; }

        public int SesionId { get; set; }

        public int CityId { get; set; }

        public DateTime SesionDate { get; set; }

        public int NumberOfVotes { get; set; }
    }
}

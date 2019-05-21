using System;
using System.ComponentModel.DataAnnotations;

namespace VoteIT.Models
{
    public class VotingSesion
    {
        [Required]
        public int Id { get; set; }

        public string SesionName { get; set; }

        public bool Available { get; set; }
    }
}

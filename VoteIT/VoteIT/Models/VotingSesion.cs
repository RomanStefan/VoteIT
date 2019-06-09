using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace VoteIT.Models
{
    public class VotingSesion
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int IdSession { get; set; }

        public string SesionName { get; set; }

        public DateTime date { get; set; }

        public bool Available { get; set; }
    }
}

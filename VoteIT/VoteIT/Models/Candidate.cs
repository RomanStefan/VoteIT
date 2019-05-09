using System.ComponentModel.DataAnnotations;

namespace VoteIT.Models
{
    public class Candidate
    {

        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        //[Required]
        public string UserName { get; set; }

        //[Required]
        public string Password { get; set; }

        public string PersonalDescription { get; set; }

        public string PoliticalParty { get; set; }

        public int CityId { get; set; }


    }
}

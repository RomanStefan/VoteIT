using System.ComponentModel.DataAnnotations;

namespace VoteIT.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        //For Votant
        public long Cnp { get; set; }

        public int CityId { get; set; }

        public bool Voted { get; set; }

        //For Candidate
        public string PersonalDescription { get; set; }

        public string PoliticalParty { get; set; }

        public int SesionId { get; set; }

        public int UserType { get; set; }



    }
}

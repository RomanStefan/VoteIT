using System;
using VoteIT.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;

namespace VoteIT.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UsersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: AllCandidates
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IList<User> GetAllCandidates()
        {
            var candidates = _context.Users.Where(candidate => candidate.UserType == 2);
            return candidates.ToList();
        }


        // GET: AllCandidatesForPresidentials
        [Microsoft.AspNetCore.Mvc.HttpGet]
        [Microsoft.AspNetCore.Mvc.Route("GetAllCandidatesForPresidentials")]
        public IList<User> GetAllCandidatesForPresidentials()
        {
            var candidates = _context.Users.Where(candidate => candidate.UserType == 2 && candidate.SesionId == 2);
            return candidates.ToList();
        }


        public class CandidateInformations
        {
            public int cityId { get; set; }
            public string name { get; set; }
        }

        // POST: GetCandidatesByCity
        [Microsoft.AspNetCore.Mvc.Route("GetUsersByCityId")]
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public IList<User> GetUsersByCityId([System.Web.Http.FromBody] CandidateInformations candidateInformations)
        {
            var candidates = _context.Users.Where(candidate => candidate.UserType == 2 && candidate.CityId == candidateInformations.cityId && candidate.SesionId == 1);
            return candidates.ToList();
        }

        public class loginInformation
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        [Microsoft.AspNetCore.Mvc.Route("GetUserByUsernameAndPassword")]
        [Microsoft.AspNetCore.Mvc.HttpPost]

        public ActionResult<IHttpActionResult> GetUser([System.Web.Http.FromBody] loginInformation logininformation)
        {
            var user = _context.Users.FirstOrDefault((u) => u.UserName == logininformation.UserName);
            if (user == null)
            {
                return NotFound();
            }

            if(!String.Equals(user.Password, logininformation.Password))
            {

            }

            return Ok(user);
        }


        public class RegisterInformations
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string Buffer { get; set; }
        }

        // POST: Voters
        [Microsoft.AspNetCore.Mvc.Route("PostVoterUser")]
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public ActionResult<IHttpActionResult> PostVoterUser([System.Web.Http.FromBody] RegisterInformations registerInformations)
        {
            var buffer = registerInformations.Buffer.Remove(0, 22);
            var bytes = System.Convert.FromBase64String(buffer);
            var imagePath = String.Format(@"D:\VoteIT\VoteIT\VoteIT\images\{0}.bmp", Guid.NewGuid());
            System.IO.File.WriteAllBytes(imagePath, bytes);

            var ocr = new OCR(imagePath);

            User user = new User();
            user.Cnp = long.Parse(ocr.Cnp);
            user.FirstName = ocr.FirstName;
            user.LastName = ocr.LastName;
            user.CityId = int.Parse(ocr.CityId);
            user.UserName = registerInformations.UserName;
            user.Password = registerInformations.Password;
            user.UserType = 1;

            _context.Users.Add(user);
            _context.SaveChanges();

            return StatusCode(201);
        }


        // POST: Candidates
        [Microsoft.AspNetCore.Mvc.Route("PostCandidateUser")]
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public ActionResult<IHttpActionResult> PostCandidateUser([System.Web.Http.FromBody] User user)
        {

            User newUser = new User();
            newUser.FirstName = user.FirstName;
            newUser.LastName = user.LastName;
            newUser.UserName = user.UserName;
            newUser.Password = user.Password;
            newUser.PersonalDescription = user.PersonalDescription;
            newUser.PoliticalParty = user.PoliticalParty;
            newUser.UserType = 2;

            _context.Users.Add(newUser);
            _context.SaveChanges();

            return StatusCode(201);
        }


        public class editCandidate
        {
            public int candidateId { get; set; }
            public string PersonalDescription { get; set; }
            public string PoliticalParty { get; set; }
            public int SesionId { get; set; }
        }

        // PUT: Candidates
        [Microsoft.AspNetCore.Mvc.Route("UpdateCandidateProfile")]
        [Microsoft.AspNetCore.Mvc.HttpPut]
        public ActionResult<IHttpActionResult> UpdateCandidateProfile([System.Web.Http.FromBody] editCandidate editCandidate)
        {

            var user = _context.Users.FirstOrDefault((u) => u.Id == editCandidate.candidateId);
            if (user != null)
            {
                user.PersonalDescription = editCandidate.PersonalDescription;
                user.PoliticalParty = editCandidate.PoliticalParty;
                user.SesionId = editCandidate.SesionId;

                _context.SaveChanges();
            }
            else
            {
                return NotFound();
            }
           
           
            return StatusCode(200);
        }

    }
}
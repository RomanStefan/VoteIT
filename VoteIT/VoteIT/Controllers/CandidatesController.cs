using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoteIT.Models;
using System.Web.Http;


namespace VoteIT.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CandidatesController(ApplicationContext context)
        {
            _context = context;
        }

        /*// GET: Candidates
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: Candidates/id
        [Microsoft.AspNetCore.Mvc.HttpGet("{id}", Name = "Get")]
        public Candidate Get(int? id)
        {
            var candidate = _context.Candidates
                .FirstOrDefault(m => m.Id == id);
            return candidate;
        } */

        // POST: Candidates
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public  ActionResult<IHttpActionResult> Post([System.Web.Http.FromBody] Candidate candidate)
        {

            Candidate newCandidate = new Candidate();
            newCandidate.FirstName = candidate.FirstName;
            newCandidate.LastName = candidate.LastName;
            newCandidate.UserName = candidate.UserName;
            newCandidate.Password = candidate.Password;
            newCandidate.PersonalDescription = candidate.PersonalDescription;
            newCandidate.PoliticalParty = candidate.PoliticalParty;

            _context.Candidates.Add(candidate);
            _context.SaveChanges();

            return StatusCode(201);
        } 
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoteIT.Models;

namespace VoteIT.Controllers
{

    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    [ApiController]
    public class VotersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VotersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Voters
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Voters/cnp
        [Microsoft.AspNetCore.Mvc.HttpGet("{cnp}", Name = "Get")]
        public Voter Get(long? cnp)
        {
            var voter = _context.Voters
                .FirstOrDefault(m => m.Cnp == cnp);
            return voter; 
        }

        // POST: api/Voters
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public void Post([Microsoft.AspNetCore.Mvc.FromBody] string value)
        {
        }

        // PUT: api/Voters/Voter
        [Microsoft.AspNetCore.Mvc.HttpPut]
        public ActionResult<IHttpActionResult> Put(Voter voter)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid model");

            var existingVoter = _context.Voters
                .FirstOrDefault(s => s.Cnp == voter.Cnp);

            if (existingVoter != null)
            {
                existingVoter.FirstName = voter.FirstName;
                existingVoter.LastName = voter.LastName;
                existingVoter.Cnp = voter.Cnp;
                _context.SaveChanges();
            }
            else
            {
                return NotFound();
            }

            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
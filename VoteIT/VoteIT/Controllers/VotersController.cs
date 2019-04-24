using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoteIT.Models;

namespace VoteIT.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class VotersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VotersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Voters
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Voters/5
        [HttpGet("{cnp}", Name = "Get")]
        public Voter Get(long? cnp)
        {
            var voter = _context.Voters
                .FirstOrDefault(m => m.Cnp == cnp);
            return voter; 
        }

        // POST: api/Voters
        [HttpPost]
        public IHttpActionResult Post([FromBody] string value)
        {
        }

        // PUT: api/Voters/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

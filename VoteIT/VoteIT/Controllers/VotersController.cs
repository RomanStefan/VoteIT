using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using VoteIT.Models;
using System.IO;
using System.Web;


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

        // GET: Voters
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: Voters/cnp
        [Microsoft.AspNetCore.Mvc.HttpGet("{cnp}", Name = "Get")]
        public Voter Get(long? cnp)
        {
            var voter = _context.Voters
                .FirstOrDefault(m => m.Cnp == cnp);
            return voter;
        }

        public class TestModel
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public MemoryStream SelectedImage { get; set; }
        }

        // POST: Voters
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public ActionResult<IHttpActionResult> Post([System.Web.Http.FromBody] TestModel myModel )
        {
            //var username = HttpContext.Current.Request.Params["username"];
            var test = myModel.SelectedImage;
            return StatusCode(201);
        }
        

        // PUT: Voters/Voter
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

        // DELETE: ApiWithActions/5
        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Microsoft.AspNetCore.Mvc;
using VoteIT.Models;
using System.IO;
using System.Web;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;

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

        public class RegisterInformations
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public string Buffer { get; set; }
        }

        // POST: Voters
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public  ActionResult<IHttpActionResult> Post([System.Web.Http.FromBody] RegisterInformations registerInformations)
        {
            var buffer = registerInformations.Buffer.Remove(0, 22);
            var bytes = System.Convert.FromBase64String(buffer);
            var imagePath = String.Format(@"D:\VoteIT\VoteIT\VoteIT\images\{0}.bmp", Guid.NewGuid());
            System.IO.File.WriteAllBytes(imagePath, bytes);

            var ocr = new OCR(imagePath);

            Voter voter = new Voter();
            voter.Cnp = long.Parse(ocr.Cnp);
            voter.FirstName = ocr.FirstName;
            voter.LastName = ocr.LastName;
            voter.UserName = registerInformations.UserName;
            voter.Password = registerInformations.Password;

            _context.Voters.Add(voter);
            _context.SaveChanges();

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
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
    public class VotingSessionsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VotingSessionsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: AllSessions
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IList<VotingSesion> GetAllVotingSessions()
        {
            var sessions = _context.VotingSesions;
            return sessions.ToList();
        }


        public class SessionInformations {
            public int Id {get; set;}
            public string SessionName { get; set; }
        }

        [Microsoft.AspNetCore.Mvc.Route("CreateSession")]
        [Microsoft.AspNetCore.Mvc.HttpPost]

        public ActionResult<IHttpActionResult> CreateSession([System.Web.Http.FromBody] SessionInformations sessionInformations)
        {
            int count = _context.VotingSesions.Count() ;
            VotingSesion _votingSesion = new VotingSesion();

            _votingSesion.SesionName = sessionInformations.SessionName;
            _votingSesion.Available = false;

            _context.VotingSesions.Add(_votingSesion);
            _context.SaveChanges();

            return StatusCode(201);
        }
    }
}
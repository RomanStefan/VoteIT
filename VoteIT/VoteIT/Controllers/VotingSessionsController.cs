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

        // GET: AllAvailableSessions
        [Microsoft.AspNetCore.Mvc.Route("AvailableSessions")]
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IList<VotingSesion> AllAvailableSessions()
        {
            var sessions = _context.VotingSesions.Where(session => session.Available == true);
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

        public class StartSessions
        {
            public bool local { get; set; }
            public bool presidential { get; set; }

            public DateTime startDate { get; set; }
        }

        [Microsoft.AspNetCore.Mvc.Route("StartSession")]
        [Microsoft.AspNetCore.Mvc.HttpPut]
        public ActionResult<IHttpActionResult> StartSession([System.Web.Http.FromBody] StartSessions startSessions)
        {
            var _date = startSessions.startDate.Date;

            if(startSessions.local == true)
            {
                var local = _context.VotingSesions.FirstOrDefault((u) => u.IdSession == 1);
                local.Available = true;
                local.date = _date;
            }

            if(startSessions.presidential == true)
            {
                var presidential = _context.VotingSesions.FirstOrDefault((u) => u.IdSession == 2);
                presidential.Available = true;
                presidential.date = _date;
            }

            //give vote option for all votants when new session is started

            var users = _context.Users.Where(user => user.UserType == 1);

            foreach(var user in users)
            {
                user.Voted = false;
            }

            _context.SaveChanges();

            return StatusCode(201);
        }


        public class EndSessions
        {
            public bool local { get; set; }
            public bool presidential { get; set; }
        }

        [Microsoft.AspNetCore.Mvc.Route("EndSession")]
        [Microsoft.AspNetCore.Mvc.HttpPut]
        public ActionResult<IHttpActionResult> EndSession([System.Web.Http.FromBody] EndSessions endSessions)
        {

            if (endSessions.local == true)
            {
                var local = _context.VotingSesions.FirstOrDefault((u) => u.IdSession == 1);
                local.Available = false;
            }

            if (endSessions.presidential == true)
            {
                var presidential = _context.VotingSesions.FirstOrDefault((u) => u.IdSession == 2);
                presidential.Available = false;
            }

            _context.SaveChanges();

            return StatusCode(201);
        }

    }
}
 
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
    public class VotingHistoryController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public VotingHistoryController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: AllVotesFromDatabase
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IList<VotingHistory> GetAllVotingHistoryes()
        {
            var history = _context.VotingsHistory;
            return history.ToList();
        }


        [Microsoft.AspNetCore.Mvc.Route("PostNewVote")]
        [Microsoft.AspNetCore.Mvc.HttpPost]

        public ActionResult<IHttpActionResult> PostVote([System.Web.Http.FromBody] VotingHistory votingHistory)
        {
            VotingHistory newVote = new VotingHistory();

            newVote.VoterId = votingHistory.VoterId;
            newVote.CandidateId = votingHistory.CandidateId;
            newVote.SesionId = votingHistory.SesionId;
            newVote.SesionDate = votingHistory.SesionDate;

            _context.VotingsHistory.Add(newVote);
            _context.SaveChanges();

            return StatusCode(201);
        }
    }
}
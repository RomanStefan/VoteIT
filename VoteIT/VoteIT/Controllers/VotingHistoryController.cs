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


        public class VoteDetails
        {
            public int Id { get; set; }

            public int VoterId { get; set; }

            public int CandidateId { get; set; }

            public int SesionId { get; set; }

            public int CityId { get; set; }

            public DateTime SesionDate { get; set; }
        }

        [Microsoft.AspNetCore.Mvc.Route("PostNewVote")]
        [Microsoft.AspNetCore.Mvc.HttpPost]

        public ActionResult<IHttpActionResult> PostVote([System.Web.Http.FromBody] VoteDetails voteDetails)
        {
            //Create new Vote
            VotingHistory newVote = new VotingHistory();
            newVote.CandidateId = voteDetails.CandidateId;
            newVote.SesionId = voteDetails.SesionId;
            newVote.SesionDate = voteDetails.SesionDate;
            newVote.CityId = voteDetails.CityId;

            _context.VotingsHistory.Add(newVote);

            //Update voting option for user ->TRUE(voted)
            var voterID = voteDetails.VoterId;
            var _user = _context.Users.FirstOrDefault(user => user.Id == voterID);
            _user.Voted = true;

            _context.SaveChanges();

            return StatusCode(201);
        }
    }
}
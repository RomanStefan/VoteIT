using Microsoft.EntityFrameworkCore.Migrations;

namespace VoteIT.Migrations
{
    public partial class UpdateCandidatesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Candidates",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Candidates",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Candidates");
        }
    }
}

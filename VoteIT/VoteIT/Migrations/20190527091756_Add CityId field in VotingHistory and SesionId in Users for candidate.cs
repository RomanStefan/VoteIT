using Microsoft.EntityFrameworkCore.Migrations;

namespace VoteIT.Migrations
{
    public partial class AddCityIdfieldinVotingHistoryandSesionIdinUsersforcandidate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "VotingsHistory",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SesionId",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityId",
                table: "VotingsHistory");

            migrationBuilder.DropColumn(
                name: "SesionId",
                table: "Users");
        }
    }
}

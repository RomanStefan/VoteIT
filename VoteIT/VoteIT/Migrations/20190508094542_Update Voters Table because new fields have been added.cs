using Microsoft.EntityFrameworkCore.Migrations;

namespace VoteIT.Migrations
{
    public partial class UpdateVotersTablebecausenewfieldshavebeenadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Voters",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Voters",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Voters");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Voters");
        }
    }
}

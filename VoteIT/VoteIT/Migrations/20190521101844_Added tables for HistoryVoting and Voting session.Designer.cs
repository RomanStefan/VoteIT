﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VoteIT.Models;

namespace VoteIT.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20190521101844_Added tables for HistoryVoting and Voting session")]
    partial class AddedtablesforHistoryVotingandVotingsession
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VoteIT.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CityName");

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("VoteIT.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CityId");

                    b.Property<long>("Cnp");

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("PersonalDescription");

                    b.Property<string>("PoliticalParty");

                    b.Property<string>("UserName")
                        .IsRequired();

                    b.Property<int>("UserType");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VoteIT.Models.VotingHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CandidateId");

                    b.Property<DateTime>("SesionDate");

                    b.Property<int>("SesionId");

                    b.Property<int>("VoterId");

                    b.HasKey("Id");

                    b.ToTable("VotingsHistory");
                });

            modelBuilder.Entity("VoteIT.Models.VotingSesion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Available");

                    b.Property<string>("SesionName");

                    b.HasKey("Id");

                    b.ToTable("VotingSesions");
                });
#pragma warning restore 612, 618
        }
    }
}

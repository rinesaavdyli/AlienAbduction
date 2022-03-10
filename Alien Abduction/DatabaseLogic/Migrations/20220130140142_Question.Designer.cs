﻿// <auto-generated />
using System;
using DatabaseLogic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DatabaseLogic.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220130140142_Question")]
    partial class Question
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("Domain.Question", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Answer")
                        .HasColumnType("TEXT");

                    b.Property<string>("Option")
                        .HasColumnType("TEXT");

                    b.Property<string>("QuestionText")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("QuizId")
                        .HasColumnType("TEXT");

                    b.Property<string>("QuiziId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("QuizId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Domain.Quiz", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Owner")
                        .HasColumnType("TEXT");

                    b.Property<string>("QuizName")
                        .HasColumnType("TEXT");

                    b.Property<int>("Timer")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("Domain.Question", b =>
                {
                    b.HasOne("Domain.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizId");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("Domain.Quiz", b =>
                {
                    b.Navigation("Questions");
                });
#pragma warning restore 612, 618
        }
    }
}

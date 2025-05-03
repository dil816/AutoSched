using AutoSched_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Database
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Presentation> Presentations { get; set; }
        public DbSet<ExaminarAvailability> ExaminarAvailabilities { get; set; }
        public DbSet<Reschedule> Reschedules { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<ScheduleApproval> ScheduleApprovals { get; set; }
        public DbSet<ScheduleUser> ScheduleUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ScheduleUser>()
                .HasKey(us => new { us.UserId, us.ScheduleId });

            modelBuilder.Entity<ScheduleUser>()
                .HasOne(us => us.User)
                .WithMany(u => u.ScheduleUser)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<ScheduleUser>()
                .HasOne(us => us.Schedule)
                .WithMany(s => s.ScheduleUser)
                .HasForeignKey(us => us.ScheduleId);
        }

    }
}

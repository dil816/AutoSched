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
    }
}

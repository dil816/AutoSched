namespace AutoSched_Service.Models
{
    public class ScheduleUser
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; } = null!;

        public int ApprovalStatus { get; set; } = 0; // 0 - pending, 1 - approve, 2 - rejected
        public int ApprovePoint { get; set; } = 0;
    }
}

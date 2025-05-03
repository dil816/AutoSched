namespace AutoSched_Service.Models
{
    public class ScheduleApproval
    {
        public int Id { get; set; }
        public string ExaminarId { get; set; } = string.Empty;
        public int ScheduleId { get; set; }
        public int ApprovalStatus { get; set; }  // 0 - pending, 1 - approve, 2 - rejected
        public int ApprovePoint {  get; set; } = 0;
    }
}

namespace AutoSched_Service.Dtos.Request
{
    public class ChangeScheduleApprovalStatusRequestDto
    {
        public string ExaminarId { get; set; } = string.Empty;
        public int ScheduleId { get; set; }
        public int ApprovalStatus { get; set; }  // 0 - pending, 1 - approve, 2 - rejected
    }
}

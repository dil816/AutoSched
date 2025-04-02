namespace AutoSched_Service.Dtos.Request
{
    public class UnAssignScheduleToUserRequestDto
    {
        public int ScheduleId { get; set; }
        public List<string> UserId { get; set; } = [];
    }
}

namespace AutoSched_Service.Dtos.Request
{
    public class ScheduleToUserUnassignRequestDto
    {
        public int ScheduleId { get; set; }
        public List<string> UserId { get; set; } = [];
    }
}

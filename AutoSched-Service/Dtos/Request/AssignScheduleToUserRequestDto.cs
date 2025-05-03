namespace AutoSched_Service.Dtos.Request
{
    public class AssignScheduleToUserRequestDto
    {
        public int ScheduleId { get; set; }
        public List<string> UserId { get; set; } = [];
    }
}

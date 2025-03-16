namespace AutoSched_Service.Dtos.Request
{
    public class ScheduleRequestDto
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int PresentationId { get; set; }
        public List<string> UserId { get; set; } = [];
    }
}

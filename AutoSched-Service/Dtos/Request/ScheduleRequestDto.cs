namespace AutoSched_Service.Dtos.Request
{
    public class ScheduleRequestDto
    {
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Description { get; set; } = string.Empty;
        public int PresentationId { get; set; }
        public List<string> UserId { get; set; } = [];
    }
}

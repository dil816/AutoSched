namespace AutoSched_Service.Dtos.Response
{
    public class ScheduleResponseDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Description { get; set; } = String.Empty;
        public ScheduledPresentation? Presentation { get; set; }
        public List<ScheduledUsers> Examiners { get; set; } = [];
        public List<ScheduledUsers> Students { get; set; } = [];
    }

    public class ScheduledUsers
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class ScheduledPresentation
    {
        public int Id { get; set; }
        public string PresentationName { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}

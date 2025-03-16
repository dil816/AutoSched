namespace AutoSched_Service.Dtos.Response
{
    public class ScheduleResponseDto
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public ScheduledPresentation? Presentation { get; set; }
        public List<ScheduledUsers> Examinars { get; set; } = [];
        public List<ScheduledUsers> Students { get; set; } = [];
    }

    public class ScheduledUsers
    {
        public string Id { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty ;
    }

    public class ScheduledPresentation
    {
        public string PresentationName { get; set; } = string.Empty;
    }
}

namespace AutoSched_Service.Dtos.Response
{
    public class RescheduleResponseDto
    {
        public int Id { get; set; }
        public string NewDate { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public PresentationDetails? PresentationDetails { get; set; }
    }

    public class PresentationDetails
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;
    }
}

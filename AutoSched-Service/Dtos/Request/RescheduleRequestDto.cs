namespace AutoSched_Service.Dtos.Request
{
    public class RescheduleRequestDto
    {
        public int Id { get; set; }
        public string NewDate { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int? PresentationId { get; set; }
    }
}

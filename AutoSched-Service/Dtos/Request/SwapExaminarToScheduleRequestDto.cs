namespace AutoSched_Service.Dtos.Request
{
    public class SwapExaminarToScheduleRequestDto
    {
        public int ScheduleId { get; set; }
        public string RejectUserId { get; set; } = string.Empty;
        public string SwapUserId { get; set; } = string.Empty;
    }
}

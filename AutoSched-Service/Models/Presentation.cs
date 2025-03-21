namespace AutoSched_Service.Models
{
    public class Presentation
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = = string.Empty;
        public Reschedule? Reschedule { get; set; } //relation 1:1 with reschedule
        public List<Schedule> Schedules { get; set; } = []; // 1:M parent
    }
}

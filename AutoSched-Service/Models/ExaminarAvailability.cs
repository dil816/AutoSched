namespace AutoSched_Service.Models
{
    public class ExaminarAvailability
    {
        public int Id { get; set; }
        public DateTimeOffset StartTime { get; set; }
        public DateTimeOffset EndTime { get; set; }
        public Boolean IsAvailable { get; set; }
    }
}
